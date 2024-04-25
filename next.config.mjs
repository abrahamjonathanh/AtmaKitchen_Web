/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API: process.env.BASE_API,
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false, // To disable Missing Suspense boundary with useSearchParams
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atmaimages.blob.core.windows.net",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
