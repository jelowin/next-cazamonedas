import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import SessionProvider from "@/components/SessionProvider";
import NavMenu from "@/components/ui/NavMenu";
import { raleway } from "@/lib/fonts";

import "./globals.css";

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
	const session = await getServerSession();
	return (
		<html lang="es-ES">
			<body className={`${raleway.className} antialiased`}>
				<SessionProvider session={session}>
					<div className="flex flex-col min-h-screen">
						<NavMenu />
						<main className="flex-1">{children}</main>
					</div>
				</SessionProvider>
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
