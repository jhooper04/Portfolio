"use client";
import type { AdminPageProps } from "app/_components/admin/common";
import { Client } from "lib/admin-api";
import { Link } from "react-router-dom";

const CreatePostAdmin: React.FunctionComponent<AdminPageProps> = ({}) => {

    return (
        <div>
            <h1 className="pb-4">Create Post</h1>
            <Link className="button-outline" to="/admin/posts">Back</Link>
            <p className="pt-4">here&apos;s a post to edit</p>
        </div>
    );
}

export default CreatePostAdmin;