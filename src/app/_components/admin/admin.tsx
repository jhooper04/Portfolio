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
import EditAssetAdmin from "app/_components/admin/assets/edit-asset";
import EditFolderAdmin from "app/_components/admin/assets/edit-folder";
import AdminNavLink from "app/_components/admin/admin-nav-link";
import LogoutAdmin from "app/_components/admin/logout";
import ListCategoriesAdmin from "app/_components/admin/categories/list-categories";
import ListTagsAdmin from "app/_components/admin/tags/list-tags";
import ListProjectsAdmin from "app/_components/admin/projects/list-projects";
import ListUsersAdmin from "app/_components/admin/users/list-users";
import { RouteInfo } from "./common";

let client: Client = null!;

type Props = {
    apiBaseUrl: string
};

const adminRoutes: {[path: string] : RouteInfo } = {
    "/admin": { name: "Dashboard", component: (client, routes) => (<DashboardAdmin client={client} routes={routes} />)},
    "/admin/assets": { name: "Assets", component: (client, routes) => (<ListAssetsAdmin client={client} routes={routes} />), subroutes: {
        "/create": { name: "Upload Asset", component: (client, routes) => (<EditAssetAdmin client={client} routes={routes} />)},
        "/edit/:assetId": { name: "Edit Asset", component: (client, routes) => (<EditAssetAdmin client={client} routes={routes} />)},
        "/create-folder": { name: "Create Folder", component: (client, routes) => (<EditFolderAdmin client={client} routes={routes} />)},
        "/edit-folder/:folderId": { name: "Edit Folder", component: (client, routes) => (<EditFolderAdmin client={client} routes={routes} />)},
    }},
    "/admin/posts": { name: "Posts", component: (client, routes) => (<ListPostsAdmin client={client} routes={routes} />), subroutes: {
        "/create": { name: "Create New Post", component: (client, routes) => (<CreatePostAdmin client={client} routes={routes} />)},
        "/:postId": {name: "Edit Post", component: (client, routes) => (<EditPostAdmin client={client} routes={routes} />)},
    }},
    "/admin/messages": { name: "Messages", component: (client, routes) => (<ListMessagesAdmin client={client} routes={routes} />)},
    "/admin/categories": { name: "Categories", component: (client, routes) => (<ListCategoriesAdmin client={client} routes={routes} />)},
    "/admin/tags": { name: "Tags", component: (client, routes) => (<ListTagsAdmin client={client} routes={routes} />)},
    "/admin/projects": { name: "Projects", component: (client, routes) => (<ListProjectsAdmin client={client} routes={routes} />)},
    "/admin/users": { name: "Users", component: (client, routes) => (<ListUsersAdmin client={client} routes={routes} />)},
    "/admin/login": { name: "Login", component: (client, routes) => (<LoginAdmin client={client} routes={routes} />), hidden: true},
    "/admin/logout": { name: "Logout", component: (client, routes) => (<LogoutAdmin client={client} routes={routes} />)},
};

const flattenRoutes = (routes: { [path: string]: RouteInfo }, basePath = ''): { [path: string]: RouteInfo } => {
    let flatRoutes: { [path: string]: RouteInfo } = {};
    Object.entries(routes).forEach(([path, routeInfo]) => {
        const fullPath = `${basePath}${path}`;
        flatRoutes[fullPath] = routeInfo;
        if (routeInfo.subroutes) {
            //flatRoutes = flatRoutes.concat();
            let subFlatRoutes = flattenRoutes(routeInfo.subroutes, `${fullPath}`);
            Object.entries(subFlatRoutes).forEach(([subpath, subRouteInfo]) => {
                flatRoutes[subpath] = subRouteInfo;
            });
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
                    <div className="w-[12rem] py-3 border-r border-slate-700">
                        {Object.keys(adminRoutes).map((route) => !adminRoutes[route].hidden ? (
                            <AdminNavLink key={route} to={route} end={route == "/admin"}>{adminRoutes[route].name}</AdminNavLink>
                        ) : null)}
                    </div>
                    <div className="flex-grow min-w-0">
                        <Routes>
                            {Object.entries(flatRoutes).map((keyValue) => (
                                <Route key={keyValue[0]} path={keyValue[0]} element={keyValue[1].component(client, flatRoutes)} />
                            ))}
                        </Routes>
                    </div>
                </main>
            </Router>
        </>
    );
}
