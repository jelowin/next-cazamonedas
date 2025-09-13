import React from "react";
import Link from "next/link";
import { Github, Heart, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
	return (
		<footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
			{/* Fondo decorativo */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent)]" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Logo y descripción */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<span className="font-outfit text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
								💰 Cazamonedas
							</span>
						</div>
						<p className="font-inter text-gray-300 leading-relaxed">
							La plataforma definitiva para coleccionistas de monedas
							conmemorativas de 2€. Organiza, rastrea y disfruta tu colección
							como nunca antes.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://github.com/jelowin/next-cazamonedas"
								target="_blank"
								rel="noopener noreferrer"
								className="group p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110"
							>
								<Github className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
							</a>
							<a
								href="mailto:jelowin@gmail.com"
								className="group p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110"
							>
								<Mail className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
							</a>
						</div>
					</div>

					{/* Enlaces rápidos */}
					<div className="space-y-4">
						<h3 className="font-poppins text-lg font-semibold text-white">
							Enlaces rápidos
						</h3>
						<div className="space-y-2">
							<Link
								href="/coins"
								className="font-inter block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
							>
								🪙 Explorar monedas
							</Link>
							<Link
								href="/"
								className="font-inter block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
							>
								🏠 Inicio
							</Link>
							<a
								href="https://github.com/jelowin/next-cazamonedas"
								target="_blank"
								rel="noopener noreferrer"
								className="font-inter inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
							>
								<Github className="h-4 w-4 mr-2" />
								Código fuente
								<ExternalLink className="h-3 w-3 ml-1" />
							</a>
						</div>
					</div>

					{/* Estadísticas y info */}
					<div className="space-y-4">
						<h3 className="font-poppins text-lg font-semibold text-white">
							Sobre el proyecto
						</h3>
						<div className="space-y-3">
							<div className="p-3 bg-white/5 rounded-lg border border-white/10">
								<div className="font-outfit text-2xl font-bold text-blue-400">
									500+
								</div>
								<div className="font-inter text-sm text-gray-300">
									Monedas catalogadas
								</div>
							</div>
							<div className="p-3 bg-white/5 rounded-lg border border-white/10">
								<div className="font-outfit text-2xl font-bold text-purple-400">
									27
								</div>
								<div className="font-inter text-sm text-gray-300">
									Países incluidos
								</div>
							</div>
							<div className="p-3 bg-white/5 rounded-lg border border-white/10">
								<div className="font-outfit text-2xl font-bold text-emerald-400">
									2004
								</div>
								<div className="font-inter text-sm text-gray-300">
									Desde el año
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Línea divisoria */}
				<div className="mt-8 pt-8 border-t border-white/10">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
						<div className="font-inter text-sm text-gray-400">
							© 2024 Cazamonedas. Hecho con ❤️ para la comunidad de
							coleccionistas.
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-400">
							<span className="font-inter">Desarrollado por</span>
							<a
								href="https://github.com/jelowin"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
							>
								<Github className="h-4 w-4" />
								<span>@jelowin</span>
							</a>
							<Heart className="h-4 w-4 text-red-400 animate-pulse" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
