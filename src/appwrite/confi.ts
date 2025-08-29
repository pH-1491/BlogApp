import config from '../conf/config.ts'
import { Client, Databases,Storage,Query, ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}:{
        title:string,
        slug:string,
        content:string,
        featuredImage:string,
        status:string,
        userId:string,
    })  {
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,  //slug is taken as the document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )

        }catch(err){
            console.log(err);
        }
    }


    async updatePost(
        slug: string,
        { title, content, featuredImage, status, userId }:
        { title: string; content: string; featuredImage: string; status: string; userId: string }
    ) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    async deletePost(slug: string){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async getPost(slug: string){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        }catch(err){
            console.log(err);
            return false;
        }
    }


    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )

        }catch(err){
            console.log(err);
            return false;
        }

    }

    //file upload service
    async uploadFile(file: File){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async deleteFile(fileId:string){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    getFilePreview(fileId:string){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;