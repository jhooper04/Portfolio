"use client";

import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Client, ApiConfig } from 'lib/admin-api';
import ListPostsAdmin from "app/_components/admin/posts/list-posts";
import LoginAdmin from "app/_components/admin/login";
import DashboardAdmin from "app/_components/admin/dashboard/dashboard";
import CreatePostAdmin from "app/_components/admin/posts/create-post";
import EditPostAdmin from "app/_components/admin/posts/edit-post";
import ListMessagesAdmin from "app/_components/admin/messages/list-messages";
import ListAssetsAdmin from "app/_components/admin/assets/list-assets";
import CreateAssetAdmin from "app/_components/admin/assets/create-asset";
import CreateFolderAdmin from "app/_components/admin/assets/create-folder";
import AdminNavLink from "app/_components/admin/admin-nav-link";
import LogoutAdmin from "app/_components/admin/logout";
import ListCategoriesAdmin from "app/_components/admin/categories/list-categories";
import ListTagsAdmin from "app/_components/admin/tags/list-tags";
import ListProjectsAdmin from "app/_components/admin/projects/list-projects";
import ListUsersAdmin from "app/_components/admin/users/list-users";

let client: Client = null!;

type Props = {
    apiBaseUrl: string
};

type RouteInfo = {
    name: string, 
    component: (client: Client) => JSX.Element,
    subroutes?: {[path: string]: RouteInfo},
    hidden?: boolean,
};

const adminRoutes: {[path: string] : RouteInfo } = {
    "/admin": { name: "Dashboard", component: (client) => (<DashboardAdmin client={client} />)},
    "/admin/assets": { name: "Assets", component: (client) => (<ListAssetsAdmin client={client} />), subroutes: {
        "/create": { name: "Upload Asset", component: (client) => (<CreateAssetAdmin client={client} />)},
        "/create-folder": { name: "Create Folder", component: (client) => (<CreateFolderAdmin client={client} />)},
    }},
    "/admin/posts": { name: "Posts", component: (client) => (<ListPostsAdmin client={client} />), subroutes: {
        "/create": { name: "Create New Post", component: (client) => (<CreatePostAdmin client={client} />)},
        "/:postId": {name: "Edit Post", component: (client) => (<EditPostAdmin client={client} />)},
    }},
    "/admin/messages": { name: "Messages", component: (client) => (<ListMessagesAdmin client={client} />)},
    "/admin/categories": { name: "Categories", component: (client) => (<ListCategoriesAdmin client={client} />)},
    "/admin/tags": { name: "Tags", component: (client) => (<ListTagsAdmin client={client} />)},
    "/admin/projects": { name: "Projects", component: (client) => (<ListProjectsAdmin client={client} />)},
    "/admin/users": { name: "Users", component: (client) => (<ListUsersAdmin client={client} />)},
    "/admin/login": { name: "Login", component: (client) => (<LoginAdmin client={client} />), hidden: true},
    "/admin/logout": { name: "Logout", component: (client) => (<LogoutAdmin client={client} />)},
};

const flattenRoutes = (routes: { [path: string]: RouteInfo }, basePath = '') => {
    let flatRoutes: { path: string; routeInfo: RouteInfo }[] = [];
    Object.entries(routes).forEach(([path, routeInfo]) => {
        const fullPath = `${basePath}${path}`;
        flatRoutes.push({ path: fullPath, routeInfo });
        if (routeInfo.subroutes) {
            flatRoutes = flatRoutes.concat(flattenRoutes(routeInfo.subroutes, `${fullPath}`));
        }
    });
    return flatRoutes;
};

export default function AdminPage({apiBaseUrl}: Props) {
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

    const flatRoutes = flattenRoutes(adminRoutes);

    return (
        <>
            <Router>
                <main className="w-screen h-screen flex flex-row">
                    <div className="w-[250px] py-3 border-r border-slate-700">
                        {Object.keys(adminRoutes).map((route) => !adminRoutes[route].hidden ? (
                            <AdminNavLink key={route} to={route} end={route == "/admin"}>{adminRoutes[route].name}</AdminNavLink>
                        ) : null)}
                    </div>
                    <div className="flex-grow">
                        <Routes>
                            {flatRoutes.map((route) => (
                                <Route key={route.path} path={route.path} element={route.routeInfo.component(client)} />
                            ))}
                        </Routes>
                    </div>
                </main>
            </Router>
        </>
    );
}
