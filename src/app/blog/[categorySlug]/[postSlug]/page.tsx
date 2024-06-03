

import IconDefs from "components/svg/icon-defs";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import { ApiConfig, Category, Client, Post, Tag } from "lib/admin-api";
import BlogPost from "components/blog/blog-post";

type Props = {
    params: { categorySlug: string, postSlug: string, postId: number },
};

console.log(process.env.SERVER_BASE_API_URL);
const client = new Client(new ApiConfig(process.env.API_KEY), process.env.SERVER_BASE_API_URL);

export async function generateStaticParams() {
    const postsResponse = await await client.postsList(1);
    return postsResponse.items.map((post) => ({ categorySlug: post.category.slug, postSlug: post.slug }));
}

export default async function BlogCategoryPost({ params: { categorySlug, postSlug } }:Props) {

    let post: Post | null = null;
    let categories: Category[] = [];
    let tags: Tag[] = [];

    try {

        post = await client.postsGetBySlug(categorySlug, postSlug, 1);

        const categoriesResponse = await client.categoriesList(1);
        const tagsResponse = await await client.tagsList(1);

        if (categoriesResponse.items && categoriesResponse.items.length > 0) {
            categories = categoriesResponse.items;
        }
        if (tagsResponse.items && tagsResponse.items.length > 0) {
            tags = tagsResponse.items;
        }
    }
    catch(e) {
        console.error(e);
        return (<p className="bg-red-500">An Error Occurred</p>);
    }
    
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <IconDefs />
                <div id="main" className="w-full p-0">
                    <BlogPost post={post} />
                </div>
            </main>
            <Footer />
        </>
    );
}