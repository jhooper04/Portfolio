


export default function Footer() {

    return (
        <footer className="min-h-96 bg-surface-light-0 dark:bg-surface-dark-0">
            <div className="w-full min-h-96 container mx-auto px-10 flex flex-col justify-center items-center">
                <div className="flex flex-row gap-5 text-neutral-light-0 dark:text-neutral-dark-5">
                    <a href="https://github.com/jhooper04/" aria-label="My Github">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                        </svg>
                    </a>
                    <a href="https://twitter.com" aria-label="My Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                            <g fill="none">
                                <g clipPath="url(#primeTwitter0)">
                                    <path fill="currentColor"
                                        d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z" />
                                </g>
                                <defs>
                                    <clipPath id="primeTwitter0">
                                        <path fill="#fff" d="M0 0h14v14H0z" />
                                    </clipPath>
                                </defs>
                            </g>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/jake-hooper-65006948/" aria-label="My LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                        </svg>
                    </a>
                </div>
                <div className="pt-8">
                    <p className="text-neutral-light-5 dark:text-neutral-dark-5">Copyright &copy; 2024. Jake Hooper. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}