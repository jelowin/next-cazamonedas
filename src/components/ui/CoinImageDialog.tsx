"use client";

import React from "react";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface CoinImageDialogProps {
	isOpen: boolean;
	onClose: () => void;
	imageSrc: string;
	country: string;
	year: string;
	reason: string;
}

export default function CoinImageDialog({
	isOpen,
	onClose,
	imageSrc,
	country,
	year,
	reason,
}: CoinImageDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl w-full mx-4 p-0 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-lg border-0 shadow-2xl animate-in zoom-in-50 duration-300">
				<DialogHeader className="p-6 pb-4">
					<DialogTitle className="text-xl font-bold text-gray-800 text-center">
						{country} - {year}
					</DialogTitle>
				</DialogHeader>

				<div className="px-6 pb-6">
					{/* Imagen principal con zoom */}
					<div className="relative w-full max-w-md mx-auto mb-4 group">
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl backdrop-blur-sm" />
						<Image
							src={imageSrc}
							alt={`Moneda de ${country} año ${year}`}
							width={400}
							height={400}
							className="relative w-full h-auto rounded-2xl shadow-xl cursor-zoom-in"
							priority
							placeholder="blur"
							blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMCAwaDQwMHY0MDBIMHoiLz48L3N2Zz4="
						/>
					</div>

					{/* Información de la moneda */}
					<div className="text-center animate-in fade-in-50 duration-500 delay-150">
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Moneda Conmemorativa de 2 Euros
						</h3>
						<p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
							{reason}
						</p>
					</div>

					{/* Indicación de interacción */}
					<div className="mt-4 text-center animate-in fade-in-30 duration-700 delay-300">
						<p className="text-xs text-gray-500">
							Haz clic fuera de la imagen para cerrar
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
