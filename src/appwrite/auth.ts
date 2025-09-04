import config from "../conf/config.ts";
import { Client, Account, ID, Models } from "appwrite";

export class AuthService {
    private client = new Client();
    private account: Account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({
                            email,
                            password,
                            name,
                        }: {
        email: string;
        password: string;
        name?: string;
    }): Promise<Models.Session | Models.User<Models.Preferences>> {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (err) {
            throw err;
        }
    }

    async login({
                    email,
                    password,
                }: {
        email: string;
        password: string;
    }): Promise<Models.Session> {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (err) {
            throw err;
        }
    }

    async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
        try {
            return await this.account.get();
        } catch (err) {
            console.error("getCurrentUser error:", err);
            return null;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.account.deleteSessions();
        } catch (err) {
            throw err;
        }
    }
}

const authService = new AuthService();
export default authService;
