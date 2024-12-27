// the follow is a full future proof implementation of the authentication service using the appwrite sdk
// if we want to build another backend using appwrite we can simply copy this whole code and add more method if needed

import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";




/**Here we are using a different approach from the one written in appwrite documentation to prevent "Vendor Lock-in"
 * Vendor lock in : is a situation in which a customer is dependent on a vendor for products and services, and cannot move to another vendor without substantial costs and inconvenience.
 * 
 * We are creating a class AuthService that will handle all the authentication related tasks.
 * we are using a constructor to initialize the client and account object. 
 * so in the future if we want to swtich to another service we can easily do that by changing the implementation of the AuthService class and the create account method accordingly.
 * 
 * This is a very good approach for production grade applications
 */

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.account = new Account(this.client);
	}

    //Sign up method 
	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                
                /**here we have implemented the functionality that after creating an account we will call the login method and the user will get automatically logged in 
                 * we could have also returned the userAccount object and then the user would have to login manually
                 * 
                 * This is a design choice and depends on the requirements of the application
                 * 
                 * if there already exits an account then we will call the login method on the login page
                 */
                return this.login({ email, password });
            }else{
                return userAccount; 
            }
		} catch (error) {
			throw error;
		}
	}

    // Sign in method
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            

        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service:: getCurrentUser:: error", error)
        }

        return null;   // this will handle if the account does not exist or also if there is an error in fetching the account or the user is not logged in
    }


    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service:: logout:: error", error)
        }
    
    }

}

const authService = new AuthService();

export default authService;
