import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

export default function Faqs() {
	return (
		<>
			<h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
				Preguntas frecuentes
			</h2>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>
						¿Qué tipo de monedas aparecen en la web?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Nuestra plataforma se centra exclusivamente en las monedas
						conmemorativas de 2 euros emitidas por los países de la Unión
						Europea desde el año 2004.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>
						¿Necesito registrarme para usar la web?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Puedes explorar todas las monedas sin registrarte, pero para marcar
						cuáles tienes en tu colección y llevar un seguimiento personalizado,
						es necesario crear una cuenta e iniciar sesión.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>
						¿Cómo puedo agregar monedas a mi colección?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Una vez que inicies sesión, simplemente busca la moneda que posees y
						márcala como parte de tu colección. Tu selección se guardará
						automáticamente en tu perfil.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>
						¿Puedo ver un resumen de mi colección?
					</AccordionTrigger>
					<AccordionContent>
						Sí, en tu perfil encontrarás un resumen con todas las monedas que
						has marcado, así como aquellas que aún te faltan.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5">
					<AccordionTrigger>
						¿Puedo modificar mi colección después de guardarla?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Por supuesto. Puedes agregar o quitar monedas de tu colección en
						cualquier momento.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-6">
					<AccordionTrigger>
						¿Puedo acceder desde cualquier dispositivo?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Sí, nuestra web está optimizada para funcionar en computadoras,
						tabletas y teléfonos móviles sin problemas.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-7">
					<AccordionTrigger>¿La web es gratuita?</AccordionTrigger>
					<AccordionContent className="text-md">
						Sí, todas las funcionalidades básicas, como explorar monedas y
						guardar tu colección, son completamente gratuitas.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
