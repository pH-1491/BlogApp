import config from '../conf/config'
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases: Databases;
    bucket: Storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({
                         title,
                         slug,
                         content,
                         featuredImage,
                         status,
                         userId,
                     }: {
        title: string;
        slug: string;
        content: string;
        featuredImage: string;
        status: string;
        userId: string;
    }) {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug, // slug used as document ID
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    }

    async updatePost(
        slug: string,
        {
            title,
            content,
            featuredImage,
            status,
            userId,
        }: {
            title: string;
            content: string;
            featuredImage: string;
            status: string;
            userId: string;
        }
    ) {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId, // included for consistency
            }
        );
    }

    async deletePost(slug: string) {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
        return true;
    }

    async getPost(slug: string) {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
    }

    async getPosts(queries = [Query.equal("status", ["active"])]) {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        );
    }

    // ---- File upload service ----
    async uploadFile(file: File) {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        );
    }

    async deleteFile(fileId: string) {
        await this.bucket.deleteFile(config.appwriteBucketId, fileId);
        return true;
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;
