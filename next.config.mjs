/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API: process.env.BASE_API,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false, // To disable Missing Suspense boundary with useSearchParams
  },
};

export default nextConfig;
