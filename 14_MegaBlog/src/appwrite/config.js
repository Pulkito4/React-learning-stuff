import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket; //storage

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					// all these are from the attributes that we created in Appwrite project database
					title,
					content,
					featuredImage, 
					status,
					userId,
				}
			);
			
		} catch (error) {
			console.log("Appwrite Service::createPost::error", error);
		}
	}

	
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return (
				await this.databases.
				updateDocument(
					conf.appwriteDatabaseId,
					conf.appwriteCollectionId,
					slug,
					{
						title,
						content,
						featuredImage,
						status,
					}
				)
			);
		} catch (error) {
			console.log("Appwrite Service::updatePost::error", error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite Service::deletePost::error", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite Service::getPost::error", error);
			return false;
		}
	}

	// we can use the following method to get all the posts
	// async getPosts() {
	//     try {
	//         return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
	//     } catch (error) {
	//         console.log("Appwrite Service::getPosts::error", error);
	//         return false;
	//     }
	// }

	/**but we wont be implementing the above method because it will return even those posts that are marked inactive (basically hidden/ private) by the user
	 * so we need to apply concept of querying to get only those posts that are active
	 */

	// we only want to get the posts that are live // use index on queries
	async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


	//file upload service
	// we should/ could make this service in another file but for simplicity we are keeping it here
	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite Service::uploadFile::error", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite Service::deleteFile::error", error);
			return false;
		}
	}


    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;