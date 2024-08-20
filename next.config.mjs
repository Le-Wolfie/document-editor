/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/documents",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
