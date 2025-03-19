import React from "react";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "@/components/SessionProvider";
import NavMenu from "@/components/ui/NavMenu";

import "./globals.css";
// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Cazamonedas - Monedas conmemorativas",
	description:
		"Encuentra todas las monedas de colección de dos euros conmemorativas de la Unión Europea. Colección de monedas. Conmemorativas. Coleccionistas de monedas.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	return (
		<html lang="es">
			<body className={`${raleway.className} antialiased`}>
				<SessionProvider session={session}>
					<div className="flex flex-col min-h-screen">
						<NavMenu />
						<main className="flex-1">{children}</main>
					</div>
				</SessionProvider>
				<footer className="border-b text-sm font-semibold text-center h-10 p-2">
					Made by @jelowin ❤️
				</footer>
			</body>
		</html>
	);
}
