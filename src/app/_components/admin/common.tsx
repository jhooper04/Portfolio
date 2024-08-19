import { Client } from "lib/admin-api";

export type RouteInfo = {
    name: string, 
    component: (client: Client, routes: {[path: string]: RouteInfo}) => JSX.Element,
    subroutes?: {[path: string]: RouteInfo},
    hidden?: boolean,
};

export type AdminPageProps = {
        client: Client,
        routes: {[path:string]: RouteInfo}
};

