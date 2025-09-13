import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorks() {
	const steps = [
		{
			number: "01",
			icon: "🔐",
			title: "Regístrate",
			description:
				"Inicia sesión con tu cuenta de Google de forma rápida y segura. No necesitas crear una nueva cuenta.",
			color: "from-blue-500 to-blue-600",
			bgColor: "from-blue-50 to-blue-100",
		},
		{
			number: "02",
			icon: "🔍",
			title: "Explora",
			description:
				"Navega por nuestra colección completa de más de 500 monedas conmemorativas de 2€ de todos los países de la UE.",
			color: "from-purple-500 to-purple-600",
			bgColor: "from-purple-50 to-purple-100",
		},
		{
			number: "03",
			icon: "💎",
			title: "Colecciona",
			description:
				"Marca las monedas que ya tienes en tu colección. Cada moneda guardada se destaca con un hermoso marco dorado.",
			color: "from-amber-500 to-amber-600",
			bgColor: "from-amber-50 to-amber-100",
		},
		{
			number: "04",
			icon: "📊",
			title: "Rastrea",
			description:
				"Ve tu progreso con estadísticas detalladas por país, año y porcentaje de colección completada.",
			color: "from-emerald-500 to-emerald-600",
			bgColor: "from-emerald-50 to-emerald-100",
		},
	];

	const features = [
		{
			icon: "🎯",
			title: "Búsqueda Inteligente",
			description: "Filtra por país, año o busca monedas específicas",
		},
		{
			icon: "📱",
			title: "Diseño Responsive",
			description: "Funciona perfectamente en móvil, tablet y desktop",
		},
		{
			icon: "🔄",
			title: "Sincronización",
			description: "Tu colección se guarda automáticamente en la nube",
		},
		{
			icon: "🏆",
			title: "Progreso Visual",
			description: "Marcos dorados y estadísticas para motivarte",
		},
	];

	return (
		<div className="relative">
			{/* Fondo con efectos */}
			<div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent)]" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				{/* Header */}
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
						¿Cómo funciona{" "}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Cazamonedas
						</span>
						?
					</h2>
					<p className="font-inter text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
						En solo 4 pasos simples estarás rastreando tu colección de monedas
						conmemorativas como un profesional
					</p>
				</div>

				{/* Pasos principales - Mejorado para móvil */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
					{steps.map((step, index) => (
						<div key={step.number} className="group relative">
							{/* Línea conectora (solo en desktop) */}
							{index < steps.length - 1 && (
								<div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 z-0" />
							)}

							{/* Card del paso - Mejorado para móvil */}
							<div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-2 z-10">
								{/* Número del paso - Responsive */}
								<div
									className={`absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${step.color} text-white rounded-full flex items-center justify-center font-outfit font-bold text-base sm:text-lg shadow-lg`}
								>
									{step.number}
								</div>

								{/* Icono - Responsive */}
								<div
									className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.bgColor} dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
								>
									{step.icon}
								</div>

								{/* Contenido - Responsive */}
								<h3 className="font-poppins text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
									{step.title}
								</h3>
								<p className="font-inter text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Características adicionales - Mejorado responsive */}
				<div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-blue-100 dark:border-gray-700">
					<div className="text-center mb-8 sm:mb-12">
						<h3 className="font-poppins text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
							¿Por qué elegir Cazamonedas?
						</h3>
						<p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
							Hemos diseñado la experiencia perfecta para coleccionistas de
							monedas
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
						{features.map((feature, index) => (
							<div
								key={index}
								className="text-center p-4 sm:p-6 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-white/50 dark:border-gray-600/50 hover:shadow-md transition-all duration-300"
							>
								<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
									{feature.icon}
								</div>
								<h4 className="font-poppins font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">
									{feature.title}
								</h4>
								<p className="font-inter text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>

					{/* Call to action - Responsive */}
					<div className="text-center">
						<Button
							className="font-inter h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
							asChild
						>
							<Link href="/coins">🚀 Comenzar mi colección</Link>
						</Button>
						<p className="font-inter text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 px-4">
							✅ Gratis para siempre • ✅ Sin anuncios • ✅ Datos seguros
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
