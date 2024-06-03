import { Post } from "lib/admin-api";

type Props = {
    post: Post
}

export default function BlogPost({post}:Props) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}
