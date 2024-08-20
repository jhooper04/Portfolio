//"use client";
import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteInfo } from './common';
import Breadcrumbs from 'app/_components/admin/bread-crumbs';

type Props = {
    routes: { [path: string]: RouteInfo },
};

const AdminHeader: FunctionComponent<Props> = ({ routes }) => {
    const location = useLocation();
    const currentRoute = location.pathname.endsWith('/') ? location.pathname.substring(0, location.pathname.length-1) : location.pathname;

    return (
        <>
            <h1 className="py-4 text-3xl">{ routes[currentRoute].name }</h1>
            <Breadcrumbs routes={routes} />
        </>
    );
};

export default AdminHeader;