import "./globals.css";

import type { Metadata } from "next";
import React from "react";
import { raleway } from "@/lib/fonts";

export const metadata: Metadata = {
	title: "Cazamonedas - Monedas de 2 euros conmemorativas",
	description:
		"Encuentra todas las monedas de colección de dos euros conmemorativas de la Unión Europea. Colección de monedas. Conmemorativas. Coleccionistas de monedas.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es-ES">
			<body className={`${raleway.className} antialiased`}>
				<header className="flex justify-between items-center p-4 gap-4 h-16">
					{/* <NavMenu /> */}
					<a href="/">Home</a>
					<div className="flex gap-4"></div>
				</header>
				<main className="flex-1">{children}</main>
				<footer className="h-10 p-2 mt-10 text-sm font-semibold text-center border border-b ">
					Made by{" "}
					<a
						className="text-blue-800 underline"
						href="https://github.com/jelowin"
						rel="nofollow noreferrer"
					>
						@jelowin
					</a>{" "}
					❤️
				</footer>
			</body>
		</html>
	);
}
