
import IconDefs from "components/svg/icon-defs";
import HeroSection from "./_components/section/hero";
import AboutSection from "./_components/section/about";
import ExperienceSection from "./_components/section/experience";
import ProjectsSection from "./_components/section/projects";
import BlogSection from "./_components/section/blog";
import ContactSection from "./_components/section/contact";
import Header from "./_components/layout/header";
import Footer from "./_components/layout/footer";

export default function Home() {

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <IconDefs />
                <div id="main" className="w-full p-0">
                    <HeroSection />
                    <AboutSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <BlogSection />
                    <ContactSection />
                </div>
            </main>
            <Footer />
        </>
    );
}
