"use client";
import { Client } from "lib/admin-api";
import { Link } from "react-router-dom";

type Props = {
    client: Client,
};

const CreatePostAdmin = ({client}:Props) => {

    return (
        <div>
            <h1 className="pb-4">Create Post</h1>
            <Link className="button-outline" to="/admin/posts">Back</Link>
            <p className="pt-4">here&apos;s a post to edit</p>
        </div>
    );
}

export default CreatePostAdmin;