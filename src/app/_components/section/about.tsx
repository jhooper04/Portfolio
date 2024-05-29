import Image from "next/image";


export default function AboutSection() {
    return (
        <section className="pt-16 h-screen" id="about" >
            <div className="container w-full mx-auto px-10 flex flex-col mt-20">
                <h2 className="text-2xl font-bold leading-tight text-left">About Me</h2>
                <div
                    className="w-full p-8 flex flex-col md:block">


                    <div className="inline-block self-center md:float-left md:pr-8">
                        <Image className="rounded-3xl overflow-hidden" src="/images/me2.webp" width={326} height={312}
                            alt="Stylized picture of me" />
                    </div>



                    <p className="py-3">
                        As a full-stack software developer, I embody the spirit of a self-starter, eager to tackle new challenges
                        with a solid grasp of software
                        engineering principles. I thrive in collaborative settings, with humility, courtesy, passion for my work,
                        always aiming to make life easier for
                        my teammates. Proactively seeking innovative solutions, I bring a creative and out-of-the-box approach to
                        every project, excelling under pressure to deliver
                        exceptional results.</p>

                    <p><strong>Let&apos;s embark on a journey to simplify complexity and craft remarkable solutions!</strong></p>
                </div>
            </div>
        </section>
    );
}