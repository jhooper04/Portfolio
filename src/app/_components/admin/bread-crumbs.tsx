import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteInfo } from './common';

type Props = {
    routes: { [path: string]: RouteInfo },
};

const Breadcrumbs: FunctionComponent<Props> = ({ routes }) => {
    const location = useLocation();
    const currentRoute = location.pathname.endsWith('/') ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
    const pathnames = currentRoute.split('/').filter(x => x && x != 'admin');

    const getDisplayName = (pathname: string) => {
        // Handle dynamic routes like /user/:id
        const routeKey = Object.keys(routes).find(route => {
            const routeParts = route.split('/').filter(x => x);
            const pathnameParts = pathname.split('/').filter(x => x);
            return (
                routeParts.length === pathnameParts.length &&
                routeParts.every((part, i) => part.startsWith(':') || part === pathnameParts[i])
            );
        });
        return routes[routeKey || ""] || pathname;
    };

    return (
        <nav className="breadcrumbs">
            <Link to="/admin">Dashboard</Link>
            {pathnames.map((value, index) => {
                const to = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
                if (index == pathnames.length-1) {
                    return (
                        <span key={to}>
                            {' / '}
                            {routes[currentRoute].name}
                        </span>
                    );
                }
                return (
                    <span key={to}>
                        {' / '}
                        <Link to={to}>{getDisplayName(to).name}</Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
