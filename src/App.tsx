import './App.css'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth.ts";
import { logout, loginUser } from './store/authSlice';
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
// import {Outlet} from "react-router-dom";

function App() {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData){
                    dispatch(loginUser({ email: 'user@example.com', password: 'password' }));
                }else{
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false))
    },[])


    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
            <div className="w-full block">
                <Header />
                <main>
                    {/*<Outlet/>*/}
                </main>
                <Footer />
            </div>
        </div>
    ) : null

}

export default App
