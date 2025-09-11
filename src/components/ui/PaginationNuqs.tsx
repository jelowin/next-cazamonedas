"use client";

import React from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationNuqsProps {
	totalPages: number;
	totalCoins: number;
}

/**
 * Componente de paginación optimizado con nuqs
 */
export default function PaginationNuqs({
	totalPages,
	totalCoins,
}: PaginationNuqsProps) {
	// Usar nuqs para manejar la página actual
	const [currentPage, setCurrentPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1).withOptions({
			clearOnDefault: true,
		})
	);

	const goToPage = React.useCallback(
		async (page: number) => {
			if (page >= 1 && page <= totalPages) {
				await setCurrentPage(page);
			}
		},
		[setCurrentPage, totalPages]
	);

	// Generar números de página a mostrar
	const getVisiblePages = React.useCallback(() => {
		const delta = 2; // Páginas a mostrar alrededor de la actual
		const range = [];
		const rangeWithDots = [];

		// Calcular el rango de páginas a mostrar
		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		// Siempre mostrar la primera página
		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...");
		} else {
			rangeWithDots.push(1);
		}

		// Agregar el rango calculado (evitando duplicar la primera página)
		range.forEach((page) => {
			if (page !== 1) {
				rangeWithDots.push(page);
			}
		});

		// Siempre mostrar la última página
		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages);
		} else if (totalPages !== 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	}, [currentPage, totalPages]);

	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			{/* Información de resultados */}
			<p className="text-sm text-gray-600 text-center px-2">
				Mostrando página {currentPage} de {totalPages} ({totalCoins} monedas en
				total)
			</p>

			{/* Controles de paginación */}
			<div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center px-2">
				{/* Botón Anterior */}
				<Button
					variant="outline"
					size="sm"
					onClick={() => goToPage(currentPage - 1)}
					disabled={currentPage <= 1}
					className="flex items-center gap-1 text-xs sm:text-sm"
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="hidden sm:inline">Anterior</span>
					<span className="sm:hidden">Ant</span>
				</Button>

				{/* Números de página */}
				<div className="flex items-center gap-1">
					{getVisiblePages().map((page, index) => {
						if (page === "...") {
							return (
								<div
									key={`dots-${index}`}
									className="flex items-center justify-center w-9 h-9"
								>
									<MoreHorizontal className="h-4 w-4" />
								</div>
							);
						}

						const pageNumber = page as number;
						return (
							<Button
								key={pageNumber}
								variant={currentPage === pageNumber ? "default" : "outline"}
								size="sm"
								onClick={() => goToPage(pageNumber)}
								className="w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm"
							>
								{pageNumber}
							</Button>
						);
					})}
				</div>

				{/* Botón Siguiente */}
				<Button
					variant="outline"
					size="sm"
					onClick={() => goToPage(currentPage + 1)}
					disabled={currentPage >= totalPages}
					className="flex items-center gap-1 text-xs sm:text-sm"
				>
					<span className="hidden sm:inline">Siguiente</span>
					<span className="sm:hidden">Sig</span>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>

			{/* Salto rápido a página */}
			{totalPages > 10 && (
				<div className="flex items-center gap-2 text-sm flex-wrap justify-center px-2">
					<span>Ir a página:</span>
					<input
						type="number"
						min="1"
						max={totalPages}
						defaultValue={currentPage}
						className="w-16 px-2 py-1 text-center border rounded text-sm"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const page = parseInt((e.target as HTMLInputElement).value);
								if (page >= 1 && page <= totalPages) {
									goToPage(page);
								}
							}
						}}
					/>
					<span>de {totalPages}</span>
				</div>
			)}
		</div>
	);
}
