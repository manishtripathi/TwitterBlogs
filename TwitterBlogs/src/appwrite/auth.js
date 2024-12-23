import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client();
    account;

    constructor () {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectid);

        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                alert ("account created succfully")
                return this.login(email, password)
                
            } else {
                return userAccount
                
            }
            
        } catch (error) {
            throw error
        }
    }
    async login({email, password}){
        try {
            const userLogin = await this.createEmailPasswordSession(email, password)
            return userLogin
            
        } catch (error) {
            throw error
        }

    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService