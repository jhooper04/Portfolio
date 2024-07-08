import LogoIcon from "components/svg/logo-icon";
import HeroImage from "../svg/hero-image";
import CircuitImage from "../svg/circuit";

export default function HeroSection() {
    return (
        <section className="h-dvh bg-about-code-light dark:bg-about-code-dark bg-center bg-cover">
            <div
                className="pt-44 container mx-auto px-10 sm:px-16 lg:px-40  flex flex-col md:flex-row place-items-stretch justify-between content-stretch items-stretch">

                <div className="md:min-w-0.5 md:w-1/2 flex flex-col text-base">
                    <div className="bg-gradient-to-r from-base to-base-alt rounded-3xl p-8  border-gray-100 border-2 shadow-xl dark:shadow-md shadow-gray-800 dark:border-black dark:shadow-black">
                        <div className="m-auto w-[450px] ">
                        <LogoIcon className="w-[450px] text-primary dark:text-base" />
                        {/* absolute left-[-250px] w-[1250px] */}
                        </div>
                        <div className="leading-normal text-base md:text-2xl text-secondary text-center" style={{textShadow: "2px 2px 2px black"}}>
                            Full Stack .Net Developer
                        </div>
                    </div>
                    
                    <div className="mt-4">
                       
                        
                        <div className="w-2/3 m-auto flex flex-col justify-center align-middle p-6 rounded-3xl bg-gradient-to-r from-base to-base-alt border-gray-700 border-2 shadow-xl dark:shadow-md shadow-gray-600 dark:border-black dark:shadow-black">
                            <div className="w-full">
                                <svg width="32" height="32" className="inline h-5 text-base">
                                    <use x="0" y="0" xlinkHref="#check" />
                                </svg>
                                Self-motivated and always eager to learn
                            </div>
                            <div className="w-full">
                                <svg width="32" height="32" className="inline h-5 text-primary-light dark:text-primary-dark">
                                    <use x="0" y="0" xlinkHref="#check" />
                                </svg>
                                Specialized in web applications
                            </div>
                            <div className="w-full">
                                <svg width="32" height="32" className="inline h-5 text-primary-light dark:text-primary-dark">
                                    <use x="0" y="0" xlinkHref="#check" />
                                </svg>
                                Known for excellent troubleshooting skills 
                            </div>
                            <div className="w-full flex flex-row gap-3 justify-center justify-apart p-4">
                                <a className="button-primary" href="#">Resume</a>
                                <a className="button-primary" href="/#contact">Contact</a>
                            </div>
                        </div>
                        
                    </div>
                    

                    <div className="flex flex-col justify-center md:justify-start py-8 md:py-16 items-center md:items-start">
                        <div className="w-2/3">
                            
                        </div>
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