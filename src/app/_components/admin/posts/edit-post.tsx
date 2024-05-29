"use client";
import { Client } from "lib/admin-api";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
    client: Client,
};

const EditPostAdmin = ({client}:Props) => {
    const { postId } = useParams();
    return (
        <div>
            <h1>Edit Post {postId}</h1>
            <p>here&apos;s a post to edit</p>
        </div>
    );
}

export default EditPostAdmin;