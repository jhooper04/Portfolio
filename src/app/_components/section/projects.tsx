

export type Project = {
    id: number,
    name: string,
    description: string,
    slug: string,
    github: string | null,
    demo: string | null,
    image: string | null,
    body: string | null,
};

type Props = {
    projects: Project[];
};

export default function ProjectsSection({ projects }: Props) {
    return (
        <section className="py-16" id="projects">
            <div className="w-full container mx-auto px-10">
                <h2 className="text-2xl font-bold leading-tight text-left">Projects</h2>
                <div className="flex flex-row">
                    {projects.map((project) => (
                        <div key={project.id} className="card w-1/3 p-4">
                            <h4 className="text-xl font-bold tracking-tight">{project.name}</h4>
                            <p>
                                {project.description}
                            </p>
                            <div className="flex flex-row">
                                { project.github != null && (
                                    <a className="button-primary p-2 m-4" href={project.github ?? ""}>Github</a>
                                )}
                                { project.demo != null && (
                                    <a className="button-primary p-2 m-4" href={project.demo ?? ""}>Demo</a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}