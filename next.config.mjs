/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: process.env.OUTPUT_DIR,
    images: { unoptimized: true },
};

if (process.env.NODE_ENV == 'development') {
    nextConfig.rewrites = async () => {
        return {
            fallback: [
                {
                    source: '/admin/:any*',
                    destination: '/admin/',
                },
            ]
        };
    };
}

console.log(process.env.OUTPUT_DIR);

export default nextConfig;
