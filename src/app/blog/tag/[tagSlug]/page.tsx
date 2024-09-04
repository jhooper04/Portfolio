

import IconDefs from "components/svg/icon-defs";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import { ApiConfig, Category, Client, Post, Tag } from "lib/admin-api";
import BlogSection from "app/_components/section/blog";

type Props = {
    params: { tagSlug: string },
};

const client = new Client(new ApiConfig(process.env.API_KEY), process.env.SERVER_BASE_API_URL);

export async function generateStaticParams() {

    const tagsResponse = await await client.tagsList(1);

    if (tagsResponse.items == undefined) throw "Invalid post response items in generateStaticParams";

    return tagsResponse.items.map((tag) => ({ tagSlug: tag.slug}));
}

export default async function BlogTag({ params: { tagSlug } }:Props) {

    //console.log(tagSlug);

    let posts: Post[] = [];
    let categories: Category[] = [];
    let tags: Tag[] = [];

    try {

        const postsResponse = await client.postsGetByTag(tagSlug, 1);

        const categoriesResponse = await client.categoriesList(1);
        const tagsResponse = await await client.tagsList(1);

        if (postsResponse.items && postsResponse.items.length > 0) {
            posts = postsResponse.items;
        }

        if (categoriesResponse.items && categoriesResponse.items.length > 0) {
            categories = categoriesResponse.items;
        }
        if (tagsResponse.items && tagsResponse.items.length > 0) {
            tags = tagsResponse.items;
        }

        //console.log(posts);
    }
    catch(e) {
        console.error(e);
    }
    
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <IconDefs />
                <div id="main" className="w-full p-0">
                    <BlogSection posts={posts} tags={tags} categories={categories} />
                </div>
            </main>
            <Footer />
        </>
    );
}