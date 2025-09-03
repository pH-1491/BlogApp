import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserData {
    id: string | number;
    name: string;
    email: string;

}

interface AuthState {
    status: boolean;
    userData: UserData | null;
    loading: boolean;
    error: string | null;
}


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const userData = await response.json();
            return userData; // This should be serializable user data
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to get user data');
            }

            const userData = await response.json();
            return userData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: AuthState = {
    status: false,
    userData: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.loading = false;
            state.error = null;

            localStorage.removeItem('token');
        },
        setUserData: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
                state.error = action.payload as string;
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
                state.error = action.payload as string;
            });
    }
});

export default authSlice.reducer;
export const { logout, setUserData, clearError } = authSlice.actions;

