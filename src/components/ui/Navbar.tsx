import React from "react";
import Link from "next/link";
import LoginButton from "@/components/ui/LoginButton";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4">
				<Link href="/" className="flex items-center space-x-2">
					<span className="text-xl font-bold">Cazamonedas</span>
				</Link>

				<nav className="flex items-center space-x-6">
					<Link
						href="/coins"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Monedas
					</Link>
					<LoginButton />
				</nav>
			</div>
		</header>
	);
}
