"use client";
import { setAuthorizationToken } from "lib/admin-api";
import { useCallback, useEffect } from "react";
import type { AdminPageProps } from "./common";

const LogoutAdmin: React.FunctionComponent<AdminPageProps> = ({client}) => {
    
    const doLogout = useCallback(async () => {
        setAuthorizationToken(null);
        window.location.href = '/admin/login';
    }, []);

    useEffect(() => {
        doLogout();
    }, [doLogout]);
    
    return (
        <div>
            <h1>Logging out</h1>
        </div>
    );
}

export default LogoutAdmin;