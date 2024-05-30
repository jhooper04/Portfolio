import { Category, Post, Tag } from "lib/admin-api";
import Link from "next/link";



type Props = {
    posts: Post[],
    tags: Tag[],
    categories: Category[],
};

export default function BlogSection({posts, tags, categories}: Props) {

    var featured = posts.filter((p) => p.isFeatured);
    var notFeatured = posts.filter((p) => !p.isFeatured);

    return (
        <section className="pt-16" id="blog">
            <div className="w-full container mx-auto px-10">
                <h2 className="text-2xl font-bold leading-tight text-left">Blog</h2>
                <div className="grid grid-cols-3">
                    {featured.map((post) => (
                        <div key={post.id} className="card">
                            <h4>{post.title}</h4><span>{post.category.name}</span>
                            <p>
                                {post.description}
                            </p>
                        </div>
                    ))}
                    <div className="col-span-2">
                        {notFeatured.map((post) => (
                            <div key={post.id} className="card col-span-3">
                                <h4>{post.title}</h4><span>{post.category.name}</span>
                                <p>
                                    {post.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="row-auto">
                        {categories.map((category) => (
                            <div key={category.id} className="">
                                <Link href={'/blog/' + category.slug}>{category.name}</Link>
                            </div>
                        ))}
                        {tags.map((tag) => (
                            <div key={tag.id} className="">
                                <Link href={'/blog/' + tag.slug}>{tag.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </section>
    );
}