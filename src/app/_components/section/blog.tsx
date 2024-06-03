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
        <section className="py-16" id="blog">
            <div className="w-full container mx-auto px-10">
                <h2 className="text-2xl font-bold leading-tight text-left">Blog</h2>
                <div className="grid grid-cols-3 gap-3">
                    {featured.map((post) => (
                        <Link key={post.id} href={`/blog/${post.category.slug}/${post.slug}`} className="block card p-4">
                            <h4 className="text-xl font-bold tracking-tighter">{post.title}</h4><span>{post.category.name}</span>
                            <p>
                                {post.description}
                            </p>
                        </Link>
                    ))}
                    <div className="col-span-2 gap-3 flex flex-col">
                        {notFeatured.map((post) => (
                            <Link key={post.id} href={`/blog/${post.category.slug}/${post.slug}`} className="block card p-4">
                                <h4 className="text-lg font-bold">{post.title}</h4><span>{post.category.name}</span>
                                <p>
                                    {post.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <div className="row-auto card p-4">
                        <h4 className="text-center text-lg font-bold tracking-tight">Categories</h4>
                        <div  className="flex flex-row mt-4">
                            {categories.map((category) => (
                                <Link key={category.id} href={'/blog/' + category.slug} className="w-1/3">{category.name}</Link>
                            ))}
                        </div>
                        <h4 className="mt-4 text-center text-lg font-bold">Tags</h4>
                        <div className="flex flex-row mt-4">
                            {tags.map((tag) => (
                                <Link key={tag.id} href={'/blog/tag/' + tag.slug} className="w-1/3">{tag.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
}