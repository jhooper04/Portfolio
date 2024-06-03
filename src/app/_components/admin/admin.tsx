"use client";

import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Client, ApiConfig } from 'lib/admin-api';
import AssetsAdmin from "app/_components/admin/assets";
import ListPostsAdmin from "app/_components/admin/posts/list-posts";
import LoginAdmin from "app/_components/admin/login";
import DashboardAdmin from "app/_components/admin/dashboard";
import CreatePostAdmin from "app/_components/admin/posts/create-post";
import EditPostAdmin from "app/_components/admin/posts/edit-post";
import ListMessagesAdmin from "app/_components/admin/messages/list-messages";

let client: Client = null!;

type Props = {
    apiBaseUrl: string
};

export default function AdminPage({apiBaseUrl}: Props) {
    //const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createClient = useCallback(async () => {
        const config = new ApiConfig(null, loggedOutCallback);

        client = await new Client(config, apiBaseUrl);

        await loggedOutCallback();
    }, [apiBaseUrl]);

    const loggedOutCallback = async () => {
        if (window.location.href.indexOf('login') == -1) {
            const currentSession = await client.usersSession();

            if (currentSession == null) {
                window.location.href = '/admin/login';
            }
        }
    };

    useEffect(() => {
        createClient().then(()=>setLoading(false)).catch(console.error);
    }, [createClient]);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <p className="text-red-400">{error}</p>
    }

    return (
        <>
            <Router>
                <main className="w-screen h-screen flex flex-row">
                    <div className="w-[250px]">
                        <div><Link to="/admin">Dashboard</Link></div>
                        <div><Link to="/admin/assets">Assets</Link></div>
                        <div><Link to="/admin/posts">Posts</Link></div>
                        <div><Link to="/admin/messages">Messages</Link></div>
                        <div><Link to="/admin/categories">Categories</Link></div>
                        <div><Link to="/admin/tags">Tags</Link></div>
                        <div><Link to="/admin/projects">Projects</Link></div>
                        <div><Link to="/admin/users">Users</Link></div>
                        <div><Link to="/admin/logout">Logout</Link></div>
                    </div>
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/admin/assets" element={<AssetsAdmin client={client} />} />
                               
                            <Route path="/admin/posts/create" element={<CreatePostAdmin client={client} />} />
                            <Route path="/admin/posts/:postId" element={<EditPostAdmin client={client} />} />
                            <Route path="/admin/posts" element={<ListPostsAdmin client={client} />} />
                            <Route path="/admin/messages" element={<ListMessagesAdmin client={client} />} />
                            <Route path="/admin/categories" element={<h1>Categories</h1>} />
                            <Route path="/admin/tags" element={<h1>Tags</h1>} />
                            <Route path="/admin/projects" element={<h1>Projects</h1>} />
                            <Route path="/admin/users" element={<h1>Users</h1>} />
                            <Route path="/admin/login" element={<LoginAdmin client={client} />} />
                            <Route path="/admin/logout" element={<LoginAdmin client={client} />} />
                            <Route path="/admin" element={<DashboardAdmin client={client} />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        </>
    );
}
