'use client';
import { useState } from 'react';
import SideMenu from 'components/layout/side-menu';
import ThemeSwitch from '../theme-switch';
import Image from 'next/image';

type Props = {
};

const Navigation = ({ }: Props) => {
    const [sideMenuOpen, setMenuOpen] = useState(false);

    return (<>
        <SideMenu isOpen={sideMenuOpen} onClose={()=>setMenuOpen(false)} />
        <nav id="header" className="w-full h-12 top-0 z-20 py-1 fixed backdrop-blur-md">
            <div className="w-full container mx-auto px-9 flex flex-nowrap items-center justify-between">

                <div className="flex md:hidden items-center" id="nav-content">
                    <button className="text-neutral-light dark:text-neutral-dark" onClick={() => setMenuOpen(true)}
                        aria-label="Main Navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z" />
                        </svg>
                    </button>
                </div>

                <div className="flex-grow flex justify-center md:justify-start">
                    <Image id="logo-top" width={200} height={60} className="text-primary-light dark:text-primary-dark invisible"
                        src="/images/opt-cursive-name.svg" alt="Jake Hooper" />
                </div>

                <div className="hidden md:flex items-center gap-3" id="nav-content">
                    <a className="inline-block navtext" href="#about">About</a>
                    <a className="inline-block navtext" href="#experience">Experience</a>
                    <a className="inline-block navtext" href="#projects">Projects</a>
                    <a className="inline-block navtext" href="#blog">Blog</a>
                    <a className="inline-block navtext" href="#contact">Contact</a>
                </div>

                <div className="flex items-center" id="nav-content">
                    <ThemeSwitch />
                </div>
            </div>
        </nav>
    </>
    );
};

export default Navigation;



