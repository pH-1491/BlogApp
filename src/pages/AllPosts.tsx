// AllPosts.tsx
import { useEffect, useState } from "react";
import service from "../appwrite/confi.ts";
import { Container } from "../components";
import PostCard from "../components/PostCard";

export interface Post {   // ✅ define Post here
    $id: string;
    title: string;
    featuredImage: string;
}

function AllPosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        service.getPosts().then((res) => {
            setPosts(res.documents as unknown as Post[]);
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
