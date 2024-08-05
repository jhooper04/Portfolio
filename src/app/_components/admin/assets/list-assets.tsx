"use client";
import type { AdminPageProps } from "app/_components/admin/common";
import { AssetList } from "lib/admin-api";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const ListAssetsAdmin: React.FunctionComponent<AdminPageProps> = ({ client }) => {
    const [assets, setAssets] = useState<AssetList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            var assets = await client.assetsList(1);
            setAssets(assets);
        }
        fetchPosts().then(() => setLoading(false)).catch((reason) => setError(reason));
    }, [client]);
    return (
        <div>
            <h1 className="pb-4 mb-4">Listing all assets</h1>
            <Link className="button-outline" to="create">Create Asset</Link>
            <Link className="button-outline" to="create-folder">Create Folder</Link>
            <p className="mt-4">here is a asset list</p>
            {assets?.items?.map((asset) => (
                <div key={asset.id}>
                    <h3 className="pt-4">{asset.filename}</h3>
                    <p className="pb-4">{asset.description}</p>
                    <Link to={""+asset.id} className="button-outline">Edit</Link>
                </div>
            ))}
            <Outlet context={{posts: assets}} />
        </div>
    );
}

export default ListAssetsAdmin;