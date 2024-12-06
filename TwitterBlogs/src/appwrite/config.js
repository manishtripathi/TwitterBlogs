import conf from "../conf/conf";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service{
    client = new Client();
    storage;
    databases;

    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectid);
        this.storage = new Storage(this.client)
        this.databases = new Databases(this.client)


    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            const CreatedPost = await this.databases.createDocument(
                conf.appWriteDatabaseid,
                conf.appWriteProjectid,
                conf.appWriteCollectionid,
                slug,
                {
                    title,
                    slug, 
                    content, 
                    featuredImage, 
                    userID,
                    status
                }
            )
            return CreatedPost;
            
        } catch (error) {
            console.error("error creating post:", error)
            throw error
        }
    }

    async updateDocument(slug, {title, content, featuredImage, status}){
        try {
            const UpdatedDocument = await this.databases.updateDocument(
                conf.appWriteDatabaseid,
                conf.appWriteCollectionid,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status

                }
            )
            return UpdatedDocument
        } catch (error) {
            console.error("error in updated document", error)
            throw error
        }

    }
    async deletePost(slug){
        try {
            const deleteResponse = await this.databases.deleteDocument(
                conf.appWriteDatabaseid,
                conf.appWriteCollectionid,
                slug,
            )
            return deleteResponse;
            
        } 
       
        catch (error) {
            console.error("delet error", error)
            throw error
        }


    }

    async getPost(slug){
        try {
            const postResponse = await this.databases.getDocument(
                conf.appWriteDatabaseid,
                conf.appWriteCollectionid,
                slug,
            )
            return postResponse
            
        } catch (error) {
            console.log("Appwrite error ", error)
            throw error
        }
    }
    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseid,
                conf.appWriteCollectionid,
                [Query.equal("status", "active")]
            )
            
        } catch (error) {
            console.error("getPosts error", error)
            throw error
        }
    }
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appWriteBucketid,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("app write error service", error)
            throw error
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appWriteBucketid,
                fileId,
            )
            return true
        } catch (error) {
            console.log("app write error service", error)
            throw error
            return false
        }
    }

    getFilePreview(fileId){
       return this.storage.getFilePreview(
            conf.appWriteBucketid,
            fileId,
        )
    }
    
}

const service = new Service()

export default service