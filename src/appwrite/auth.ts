import config from '../conf/config.ts'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account: Account;

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
        name?: string; // name is optional
    }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                // call another method if needed
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
                    password
    }:{
        email: string;
        password: string;
    }) {
        try{
            return await this.account.createEmailPasswordSession(email, password);

        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get;
        }catch(err){
            throw err;
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(err){
            throw err;
        }
    }
}

const authService = new AuthService();
export default authService;
