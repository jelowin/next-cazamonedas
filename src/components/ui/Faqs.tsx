import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

export default function Faqs() {
	const faqs = [
		{
			question: "¿Qué tipo de monedas aparecen en la web?",
			answer:
				"Nuestra plataforma se centra exclusivamente en las monedas conmemorativas de 2 euros emitidas por los países de la Unión Europea desde el año 2004. Incluimos todas las emisiones especiales oficiales.",
			icon: "🪙",
		},
		{
			question: "¿Necesito registrarme para usar la web?",
			answer:
				"Puedes explorar todas las monedas sin registrarte, pero para marcar cuáles tienes en tu colección y llevar un seguimiento personalizado, es necesario crear una cuenta e iniciar sesión con Google.",
			icon: "🔐",
		},
		{
			question: "¿Cómo puedo agregar monedas a mi colección?",
			answer:
				"Una vez que inicies sesión, simplemente busca la moneda que posees y haz clic en el botón 'Conseguir'. Tu selección se guardará automáticamente con una hermosa animación de tesoro.",
			icon: "💎",
		},
		{
			question: "¿Puedo ver un resumen de mi colección?",
			answer:
				"¡Por supuesto! En tu perfil encontrarás estadísticas completas: total de monedas, progreso por país, porcentaje completado y marcos dorados para las monedas que ya posees.",
			icon: "📊",
		},
		{
			question: "¿Puedo modificar mi colección después de guardarla?",
			answer:
				"Absolutamente. Puedes agregar o quitar monedas de tu colección en cualquier momento. Los cambios se sincronizan automáticamente en todos tus dispositivos.",
			icon: "✏️",
		},
		{
			question: "¿Puedo acceder desde cualquier dispositivo?",
			answer:
				"Sí, nuestra web está completamente optimizada para funcionar perfectamente en computadoras, tabletas y teléfonos móviles. Tu colección se sincroniza en todos los dispositivos.",
			icon: "📱",
		},
		{
			question: "¿La web es gratuita?",
			answer:
				"¡Completamente gratuita! Todas las funcionalidades - explorar monedas, guardar tu colección, ver estadísticas y usar filtros avanzados - están disponibles sin costo alguno.",
			icon: "💚",
		},
	];

	return (
		<div className="max-w-4xl mx-auto">
			{/* Header mejorado */}
			<div className="text-center mb-12">
				<h2 className="font-poppins text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
					Preguntas{" "}
					<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						frecuentes
					</span>
				</h2>
				<p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
					Todo lo que necesitas saber sobre Cazamonedas
				</p>
			</div>

			{/* Accordion mejorado */}
			<Accordion type="single" collapsible className="w-full space-y-4">
				{faqs.map((faq, index) => (
					<AccordionItem
						key={`item-${index + 1}`}
						value={`item-${index + 1}`}
						className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
					>
						<AccordionTrigger className="font-inter px-6 py-4 text-left hover:no-underline group">
							<div className="flex items-center gap-4 text-lg font-semibold text-gray-900">
								<span className="text-2xl group-hover:scale-110 transition-transform duration-300">
									{faq.icon}
								</span>
								<span className="group-hover:text-blue-600 transition-colors duration-300">
									{faq.question}
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="font-inter px-6 pb-4 text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-4">
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			{/* Call to action */}
			<div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
				<h3 className="font-poppins text-2xl font-bold text-gray-900 mb-4">
					¿Tienes más preguntas?
				</h3>
				<p className="font-inter text-gray-600 mb-6">
					Estamos aquí para ayudarte. Contáctanos si necesitas más información.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="mailto:support@cazamonedas.com"
						className="font-inter inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
					>
						📧 Enviar email
					</a>
					<a
						href="/coins"
						className="font-inter inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
					>
						🚀 Probar ahora
					</a>
				</div>
			</div>
		</div>
	);
}
