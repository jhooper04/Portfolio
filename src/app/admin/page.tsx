"use client";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Client, ApiConfig } from 'lib/admin-api';
import AssetsAdmin from "app/_components/admin/assets";
import ListPostsAdmin from "app/_components/admin/posts/list-posts";
import LoginAdmin from "app/_components/admin/login";
import DashboardAdmin from "app/_components/admin/dashboard";
import CreatePostAdmin from "app/_components/admin/posts/create-post";
import EditPostAdmin from "app/_components/admin/posts/edit-post";

let client: Client = null!;
let loggedIn: boolean = false;

if (typeof window !== 'undefined') {


    const createClient = async () => {
        client = await new Client(new ApiConfig(), "http://localhost:5000",);

        if (window.location.href.indexOf('login') == -1) {
            const currentSession = await client.usersSession();

            console.log(currentSession);

            if (currentSession == null) {
                console.log('here');

                window.location.href = '/admin/login';
            }

            loggedIn = false
        }
    };
    createClient().catch(console.error);
}

export default function AdminPage() {
    //const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {

            if (client != null) {
                setLoading(false);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Router>
                <main className="w-screen h-screen flex flex-row">
                    <div className="w-[250px]">
                        <div><Link to="/admin/assets">Assets</Link></div>
                        <div><Link to="/admin/posts">Posts</Link></div>
                        <div><Link to="/admin/messages">Messages</Link></div>
                        <div><Link to="/admin/categories">Categories</Link></div>
                        <div><Link to="/admin/tags">Tags</Link></div>
                        <div><Link to="/admin/projects">Projects</Link></div>
                        <div><Link to="/admin/users">Users</Link></div>
                    </div>
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/admin/assets" element={<AssetsAdmin client={client} />} />
                               
                            <Route path="/admin/posts" element={<ListPostsAdmin client={client} />}>
                                <Route path="create" element={<CreatePostAdmin client={client} />} />
                                <Route path=":postId" element={<EditPostAdmin client={client} />} />
                            </Route>
                            <Route path="/admin/messages" element={<h1>Messages</h1>} />
                            <Route path="/admin/categories" element={<h1>Categories</h1>} />
                            <Route path="/admin/tags" element={<h1>Tags</h1>} />
                            <Route path="/admin/projects" element={<h1>Projects</h1>} />
                            <Route path="/admin/users" element={<h1>Users</h1>} />
                            <Route path="/admin/login" element={<LoginAdmin client={client} />} />
                            <Route path="/admin" element={<DashboardAdmin client={client} />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        </>
    );
}
