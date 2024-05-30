"use client";
import { Client } from "lib/admin-api";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

type Props = {
    client: Client,
};

const EditPostAdmin = ({client}:Props) => {
    const { postId } = useParams();
    return (
        <div>
            <h1 className="pb-4">Edit Post {postId}</h1>
            <Link className="button-outline" to="/admin/posts">Back</Link>
            <p className="pt-4">here&apos;s a post to edit</p>
        </div>
    );
}

export default EditPostAdmin;