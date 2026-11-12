import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // تحديد جذر Turbopack ليكون مجلد job-filter نفسه
    root: path.join(__dirname),
  },
  output: 'standalone',
};

export default nextConfig;