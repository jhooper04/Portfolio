/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist/out',
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

export default nextConfig;
