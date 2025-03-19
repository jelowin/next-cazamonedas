import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.ecb.europa.eu",
				port: "",
				pathname: "/euro/coins/comm/html/**",
			},
		],
	},
};

export default nextConfig;
