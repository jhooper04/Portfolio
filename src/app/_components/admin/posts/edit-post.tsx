"use client";
import { AdminPageProps } from "app/_components/admin/common";
import { Link, useParams } from "react-router-dom";

const EditPostAdmin: React.FunctionComponent<AdminPageProps> = ({client}) => {
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