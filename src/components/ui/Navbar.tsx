import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/ui/LoginButton";
import StatsPopover from "@/components/ui/StatsPopover";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-900/5 dark:shadow-gray-100/5 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70 transition-colors duration-300">
			<div className="container flex h-16 items-center justify-between px-2 sm:px-4">
				{/* Logo con efectos mejorados */}
				<Link
					href="/"
					className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
				>
					<span className="font-outfit text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-blue-900 transition-all duration-300">
						Cazamonedas
					</span>
				</Link>

				<nav className="flex items-center space-x-1 sm:space-x-4">
					{/* Botón de Monedas con efectos modernos */}
					<Link
						href="/coins"
						className="font-inter group relative px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:shadow-md hover:shadow-blue-200/50 dark:hover:shadow-blue-800/25 hover:scale-105"
					>
						<span className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 font-semibold">
							Monedas
						</span>
						{/* Efecto de brillo sutil */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-lg" />
					</Link>

					{/* GitHub Icon */}
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="font-inter h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
					>
						<a
							href="https://github.com/jelowin/next-cazamonedas"
							target="_blank"
							rel="noopener noreferrer"
							title="Ver código fuente en GitHub"
						>
							<Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
							<span className="sr-only">GitHub</span>
						</a>
					</Button>

					{/* Theme Toggle */}
					<ThemeToggle />

					{/* Wrapper para StatsPopover con efectos */}
					<div className="group relative">
						<StatsPopover />
					</div>

					{/* Wrapper para LoginButton con efectos */}
					<div className="group relative">
						<LoginButton />
					</div>
				</nav>
			</div>
		</header>
	);
}
