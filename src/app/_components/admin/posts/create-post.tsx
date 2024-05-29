"use client";
import { Client } from "lib/admin-api";

type Props = {
    client: Client,
};

const CreatePostAdmin = ({client}:Props) => {

    return (
        <div>
            <h1>Create Post</h1>
            <p>here&apos;s a post to edit</p>
        </div>
    );
}

export default CreatePostAdmin;