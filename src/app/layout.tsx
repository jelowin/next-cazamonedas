import "./globals.css";
import type { Metadata } from "next";

import React from "react";
import { inter, poppins, outfit } from "@/lib/fonts";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SessionProviderWrapper from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import NuqsProvider from "@/components/providers/NuqsProvider";
import { StatsProvider } from "@/contexts/StatsContext";
import { AppDataProvider } from "@/contexts/AppDataContext";

export const metadata: Metadata = {
	title: "Cazamonedas - Monedas de 2 euros conmemorativas",
	description:
		"Encuentra todas las monedas de colección de dos euros conmemorativas de la Unión Europea. Colección de monedas. Conmemorativas. Coleccionistas de monedas.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es-ES" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${poppins.variable} ${outfit.variable} font-inter antialiased bg-background text-foreground transition-colors duration-300`}
			>
				<ThemeProvider>
					<SessionProviderWrapper>
						<AppDataProvider>
							<StatsProvider>
								<NuqsProvider>
									<div className="flex min-h-screen flex-col">
										<Navbar />
										<main className="flex-1">{children}</main>
										<Footer />
									</div>
								</NuqsProvider>
							</StatsProvider>
						</AppDataProvider>
					</SessionProviderWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
