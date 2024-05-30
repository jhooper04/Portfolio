
import IconDefs from "components/svg/icon-defs";
import HeroSection from "components/section/hero";
import AboutSection from "components/section/about";
import ExperienceSection from "components/section/experience";
import ProjectsSection from "components/section/projects";
import BlogSection from "components/section/blog";
import ContactSection from "components/section/contact";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import { ApiConfig, Category, Client, Project, Tag, Post } from "lib/admin-api";

export default async function Home() {

    const client = new Client(new ApiConfig({ apiKey: process.env.API_KEY }), "http://127.0.0.1:5000");

    let projects: Project[] = [];
    let categories: Category[] = [];
    let tags: Tag[] = [];
    let posts: Post[] = [];

    try {
        const projectsResponse = await client.projectsList(1);
        const categoriesResponse = await client.categoriesList(1);
        const tagsResponse = await await client.tagsList(1);
        const postsResponse = await client.postsList(1);

        console.log(postsResponse);

        if (projectsResponse.items && projectsResponse.items.length > 0) {
            projects = projectsResponse.items;
        }
        if (categoriesResponse.items && categoriesResponse.items.length > 0) {
            categories = categoriesResponse.items;
        }
        if (tagsResponse.items && tagsResponse.items.length > 0) {
            tags = tagsResponse.items;
        }
        if (postsResponse.items && postsResponse.items.length > 0) {
            posts = postsResponse.items;
        }
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
                    <HeroSection />
                    <AboutSection />
                    <ExperienceSection />
                    <ProjectsSection projects={projects} />
                    <BlogSection posts={posts} tags={tags} categories={categories} />
                    <ContactSection />
                </div>
            </main>
            <Footer />
        </>
    );
}
