/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
