import type { Config } from "tailwindcss";

function withOpacity(variableName: string): any {
    return ({ opacityValue }: any) => {
        if (opacityValue) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "about-code-light": "linear-gradient(rgba(255,255,255,0.025), rgba(255,255,255,0.025)), url('/images/hero-circuit-3.jpg')",
                "about-code-dark": "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/hero-circuit-3.jpg')",
            },
            // // this will generate utilities like `bg-base` and `bg-primary`
            // backgroundColor: {
            //     'base': withOpacity('--color-base'),
            //     'base-alt': withOpacity('--color-base-alt'),
            //     'primary': withOpacity('--color-primary'),
            //     'secondary': withOpacity('--color-secondary'),
            // },
            // // these classes end up like `text-base` and `text-primary`
            textColor: {
                'base': withOpacity('--color-text-base'),
                'base-alt': withOpacity('--color-text-alt'),
                'muted': withOpacity('--color-text-muted'),
                'muted-alt': withOpacity('--color-text-alt-muted'),
                'primary': withOpacity('--color-primary'),
                'secondary': withOpacity('--color-secondary'),
            },
            // borderColor: {
            //     'base': withOpacity('--color-text-base'),
            //     'base-alt': withOpacity('--color-text-alt'),
            //     'muted': withOpacity('--color-text-muted'),
            //     'muted-alt': withOpacity('--color-text-alt-muted'),
            //     'primary': withOpacity('--color-primary'),
            //     'secondary': withOpacity('--color-secondary'),
            // },

            colors: {
                'base': withOpacity('--color-base'),
                'base-alt': withOpacity('--color-base-alt'),
                'muted': withOpacity('--color-text-muted'),
                'muted-alt': withOpacity('--color-text-muted-alt'),
                'primary': withOpacity('--color-primary'),
                'secondary': withOpacity('--color-secondary'),
            },
            
            // colors: {
            //     'base': 'rgba(var(--color-base))',
            //     'base-alt': 'rgba(var(--color-base-alt))',
            //     'primary': 'rgba(var(--color-primary))',
            //     'secondary': 'rgba(var(--color-secondary))',
            //     'surface': {
            //         light: '#0039e6',
            //         'light-0': '#e6ecff',
            //         'light-1': '#ccd9ff',
            //         'light-2': '#b3c6ff',
            //         'light-3': '#99b3ff',
            //         'light-4': '#809fff',
            //         'light-5': '#668cff',
            //         DEFAULT: '#0039e6',
            //         dark: '#0039e6',
            //         'dark-0': '#00061a',
            //         'dark-1': '#000d33',
            //         'dark-2': '#00134d',
            //         'dark-3': '#001a66',
            //         'dark-4': '#002699',
            //         'dark-5': '#002db3',
            //     },
            //     'primary': {
            //         light: '#003380',
            //         'light-0': '#001f4d',
            //         'light-1': '#002966',
            //         'light-2': '#003380',
            //         'light-3': '#003d99',
            //         'light-4': '#0047b3',
            //         'light-5': '#0052cc',
            //         DEFAULT: '#005ce6',
            //         dark: '#4d94ff',
            //         'dark-0': '#80b3ff',
            //         'dark-1': '#66a3ff',
            //         'dark-2': '#4d94ff',
            //         'dark-3': '#3385ff',
            //         'dark-4': '#1a75ff',
            //         'dark-5': '#0066ff',
            //     },
            //     'secondary': {
            //         light: '#cc8800',
            //         'light-0': '#ffb31a',
            //         'light-1': '#ffaa00',
            //         'light-2': '#e69900',
            //         'light-3': '#cc8800',
            //         'light-4': '#b37700',
            //         'light-5': '#996600',
            //         DEFAULT: '#ffbb33',
            //         dark: '#ffdd99',
            //         'dark-0': '#ffeecc',
            //         'dark-1': '#ffe6b3',
            //         'dark-2': '#ffdd99',
            //         'dark-3': '#ffd480',
            //         'dark-4': '#ffcc66',
            //         'dark-5': '#ffc34d',
            //     },
            //     'neutral': {
            //         light: '#595959',
            //         'light-5': '#333333',
            //         'light-4': '#404040',
            //         'light-3': '#4d4d4d',
            //         'light-2': '#595959',
            //         'light-1': '#666666',
            //         'light-0': '#737373',
            //         DEFAULT: '#808080',
            //         dark: '#a6a6a6',
            //         'dark-0': '#8c8c8c',
            //         'dark-1': '#999999',
            //         'dark-2': '#a6a6a6',
            //         'dark-3': '#b3b3b3',
            //         'dark-4': '#bfbfbf',
            //         'dark-5': '#cccccc',
            //     },
            // },
        },
    },
    plugins: [],
};
export default config;
