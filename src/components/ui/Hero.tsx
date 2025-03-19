import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section
			id="hero"
			className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-4 lg:pb-12 pt-10"
		>
			{/* <div className="bg-center bg-yellow-500 opacity-30 bg-[url(/hero.webp)] bg-blend-multiply"></div> */}
			<h1 className="text-4xl sm:text-7xl font-bold text-transparent tracking-tight text-balance mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text">
				Cazamonedas
			</h1>
			<p className="text-xl text-center text-pretty text-gray-500">
				Colecciona todas las monedas conmemorativas de 2 euros de la Unión
				Europea. Empieza ahora!
			</p>
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<Button className="h-12" asChild>
					<Link
						href="/coins"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Empieza ahora!
					</Link>
				</Button>
				<Button className="h-12" variant="outline" asChild>
					<a href="#how-it-works" className="rounded-md">
						¿Como funciona?
					</a>
				</Button>
			</div>
		</section>
	);
}
