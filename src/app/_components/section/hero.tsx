import LogoIcon from "components/svg/logo-icon";
import HeroImage from "../svg/hero-image";
import CircuitImage from "../svg/circuit";

export default function HeroSection() {
    return (
        <section className=" bg-about-code-light dark:bg-about-code-dark">
            <div
                className="pt-44 container mx-auto px-10 sm:px-16 lg:px-40  flex flex-col md:flex-row place-items-stretch justify-between content-stretch items-stretch">

                <div className="md:min-w-0.5 md:w-1/2 flex flex-col text-base">
                    <LogoIcon />
                    <div
                        className="leading-normal ml-1 text-base md:text-2xl text-secondary text-center md:text-left">
                        Full Stack Developer</div>

                    <div className="mt-10 flex flex-row gap-3 justify-center md:justify-start md:mt-16">
                        <a className="button-primary" href="#">Resume</a>
                        <a className="button-outline" href="#">Contact</a>
                    </div>

                    <div className="flex flex-col justify-center md:justify-start py-8 md:py-16 items-center md:items-start">
                        <span className="w-48">
                            <svg width="32" height="32" className="inline h-5 text-base">
                                <use x="0" y="0" xlinkHref="#check" />
                            </svg>
                            Self starter
                        </span>
                        <span className="w-48">
                            <svg width="32" height="32" className="inline h-5 text-primary-light dark:text-primary-dark">
                                <use x="0" y="0" xlinkHref="#check" />
                            </svg>
                            Results driven
                        </span>
                        <span className="w-48">
                            <svg width="32" height="32" className="inline h-5 text-primary-light dark:text-primary-dark">
                                <use x="0" y="0" xlinkHref="#check" />
                            </svg>
                            Detail oriented
                        </span>
                    </div>
                </div>
                {/* <CircuitImage className="md:min-w-0.5 md:w-1/2 mx-auto text-neutral-light dark:text-neutral-dark" /> */}
                {/* <HeroImage className="md:min-w-0.5 md:w-1/2 text-neutral-light dark:text-neutral-dark" />
                <img id="traces-sphere" data-src="/images/traces-sphere.svg" alt="Traces Sphere"
                    className="invisible " /> */}

            </div>
        </section>
    );
}