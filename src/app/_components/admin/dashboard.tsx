"use client";
import { Client } from "lib/admin-api";
import { useEffect, useState } from "react";

type Props = {
    client: Client,
};

const DashboardAdmin = ({client}:Props) => {
    

    
    return (
        <div>
            <h1>Dashboard</h1>
            
            <p>here is the dashboard</p>
        </div>
    );
}

export default DashboardAdmin;