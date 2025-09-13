import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section
			id="hero"
			className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-4 lg:pb-12 pt-10 overflow-hidden transition-colors duration-300"
		>
			{/* Fondo con efectos modernos */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent)] opacity-70 dark:opacity-40" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent)] opacity-70 dark:opacity-40" />

			{/* Partículas decorativas flotantes */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 dark:bg-blue-400/50 rounded-full animate-bounce"
					style={{ animationDelay: "0s", animationDuration: "3s" }}
				/>
				<div
					className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 dark:bg-purple-400/50 rounded-full animate-bounce"
					style={{ animationDelay: "1s", animationDuration: "4s" }}
				/>
				<div
					className="absolute bottom-40 left-20 w-2 h-2 bg-amber-400/30 dark:bg-amber-400/50 rounded-full animate-bounce"
					style={{ animationDelay: "2s", animationDuration: "3.5s" }}
				/>
				<div
					className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-emerald-400/30 dark:bg-emerald-400/50 rounded-full animate-bounce"
					style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
				/>
			</div>

			{/* Contenido principal */}
			<div className="relative z-10 text-center max-w-5xl mx-auto">
				{/* Badge superior */}
				<div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
					<span className="animate-pulse mr-2">🪙</span>
					¡Nueva colección 2024 disponible!
				</div>

				{/* Título principal mejorado */}
				<h1 className="font-poppins text-5xl sm:text-7xl lg:text-8xl font-extrabold text-transparent tracking-tight text-balance mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text animate-pulse">
					Cazamonedas
				</h1>

				{/* Subtítulo mejorado */}
				<p className="font-inter text-xl sm:text-2xl font-medium text-center text-pretty text-gray-700 dark:text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto">
					La mayor colección de{" "}
					<span className="font-semibold text-blue-600 dark:text-blue-400">
						monedas conmemorativas de 2€
					</span>{" "}
					de la Unión Europea
				</p>

				<p className="font-inter text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
					Descubre, colecciona y rastrea todas las monedas especiales. ¡Más de
					500 monedas únicas esperándote!
				</p>

				{/* Imagen destacada de monedas */}
				<div className="relative w-full max-w-md mx-auto mb-10">
					<div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl animate-pulse" />
					<Image
						src="/hero.webp"
						alt="Colección de monedas conmemorativas de 2 euros"
						width={400}
						height={300}
						className="relative rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
						priority
					/>
				</div>

				{/* Botones mejorados */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
					<Button
						className="font-inter h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
						asChild
					>
						<Link href="/coins">🚀 Empieza ahora</Link>
					</Button>
					<Button
						className="font-inter h-14 px-8 text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl hover:scale-105 transition-all duration-300"
						variant="outline"
						asChild
					>
						<a href="#how-it-works">📖 ¿Cómo funciona?</a>
					</Button>
				</div>

				{/* Estadísticas rápidas */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
					<div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-300">
						<div className="font-outfit text-3xl font-bold text-blue-600 mb-1">
							500+
						</div>
						<div className="font-inter text-sm text-gray-600">
							Monedas únicas
						</div>
					</div>
					<div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-300">
						<div className="font-outfit text-3xl font-bold text-purple-600 mb-1">
							27
						</div>
						<div className="font-inter text-sm text-gray-600">Países EU</div>
					</div>
					<div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-300">
						<div className="font-outfit text-3xl font-bold text-amber-600 mb-1">
							2007+
						</div>
						<div className="font-inter text-sm text-gray-600">Desde el año</div>
					</div>
				</div>
			</div>
		</section>
	);
}
