"use client";
import { Client, PostList } from "lib/admin-api";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

type Props = {
    client: Client,
};

const ListPostsAdmin = ({ client }: Props) => {
    const [posts, setPosts] = useState<PostList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            var posts = await client.postsList(1);
            setPosts(posts);
        }
        fetchPosts().then(() => setLoading(false)).catch((reason) => setError(reason));
    }, [client]);
    return (
        <div>
            <h1 className="pb-4 mb-4">Listing all posts</h1>
            <Link className="button-outline" to="create">Create Post</Link>
            <p className="mt-4">here is a post list</p>
            {posts?.items?.map((post) => (
                <div key={post.id}>
                    <h3 className="pt-4">{post.title}</h3>
                    <p className="pb-4">{post.description}</p>
                    <Link to={""+post.id} className="button-outline">Edit</Link>
                </div>
            ))}
            <Outlet context={{posts}} />
        </div>
    );
}

export default ListPostsAdmin;