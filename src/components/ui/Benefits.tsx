import React from "react";

export default function Benefits() {
	const benefits = [
		{
			icon: "🎯",
			title: "Organización Perfecta",
			description:
				"Mantén tu colección organizada digitalmente. Nunca más perderás de vista qué monedas tienes.",
			gradient: "from-blue-500 to-cyan-500",
		},
		{
			icon: "📈",
			title: "Progreso Motivador",
			description:
				"Ve tu progreso crecer con estadísticas visuales. Marcos dorados para tus logros.",
			gradient: "from-purple-500 to-pink-500",
		},
		{
			icon: "🌍",
			title: "Colección Completa",
			description:
				"Accede a la base de datos más completa de monedas conmemorativas de 2€ de Europa.",
			gradient: "from-emerald-500 to-teal-500",
		},
		{
			icon: "⚡",
			title: "Súper Rápido",
			description:
				"Interfaz optimizada que carga al instante. Busca y marca monedas en segundos.",
			gradient: "from-amber-500 to-orange-500",
		},
	];

	return (
		<section className="relative py-20 overflow-hidden">
			{/* Fondo con gradiente */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent)]" />

			{/* Partículas decorativas */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${2 + Math.random() * 2}s`,
						}}
					/>
				))}
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="font-poppins text-4xl sm:text-5xl font-bold text-white mb-6">
						¿Por qué miles de coleccionistas{" "}
						<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
							confían en nosotros
						</span>
						?
					</h2>
					<p className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Descubre los beneficios que hacen de Cazamonedas la plataforma
						favorita para coleccionistas
					</p>
				</div>

				{/* Grid de beneficios */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
					{benefits.map((benefit, index) => (
						<div key={index} className="group relative">
							{/* Card */}
							<div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
								{/* Icono con gradiente */}
								<div
									className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
								>
									{benefit.icon}
								</div>

								{/* Contenido */}
								<h3 className="font-poppins text-2xl font-bold text-white mb-4">
									{benefit.title}
								</h3>
								<p className="font-inter text-gray-300 leading-relaxed text-lg">
									{benefit.description}
								</p>

								{/* Efecto de brillo en hover */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl" />
							</div>
						</div>
					))}
				</div>

				{/* Estadísticas impresionantes */}
				<div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
					<div className="text-center">
						<div className="font-outfit text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
							500+
						</div>
						<div className="font-inter text-gray-300 text-lg">
							Monedas catalogadas
						</div>
					</div>
					<div className="text-center">
						<div className="font-outfit text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
							27
						</div>
						<div className="font-inter text-gray-300 text-lg">
							Países incluidos
						</div>
					</div>
					<div className="text-center">
						<div className="font-outfit text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
							2007+
						</div>
						<div className="font-inter text-gray-300 text-lg">
							Años de historia
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
