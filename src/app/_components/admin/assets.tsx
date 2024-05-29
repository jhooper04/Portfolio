"use client";
import { Client } from "lib/admin-api";
import { useState } from "react";

type Props = {
    client: Client,
};

const AssetsAdmin = ({client}:Props) => {

    return (
        <div>
            <h1>Assets</h1>
            <p>here are the assets</p>
        </div>
    );
}

export default AssetsAdmin;