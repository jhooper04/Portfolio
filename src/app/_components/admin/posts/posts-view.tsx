"use client";
import { Client } from "lib/admin-api";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditPostAdmin from "./edit-post";
import ListPostsAdmin from "./list-posts";
import CreatePostAdmin from "./create-post";

type Props = {
    client: Client,
};

const PostsViewAdmin = ({ client }: Props) => {
    return (
        <div className="flex flex-row">
            <div className="">
                <div><Link to="/admin/posts/create">Create</Link></div>
            </div>
            <div className="w-2/3">
            </div>
        </div>
    );
}

export default PostsViewAdmin;