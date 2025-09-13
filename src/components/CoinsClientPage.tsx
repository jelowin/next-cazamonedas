"use client";

import React from "react";
import FiltersSection from "@/components/ui/FiltersSection";
import CoinsContainer from "@/components/ui/CoinsContainer";
import { useAppData } from "@/contexts/AppDataContext";

/**
 * Skeleton para la carga inicial de filtros
 */
function FiltersSkeletonSection() {
	return (
		<div className="mb-6">
			<div className="flex flex-col sm:flex-row w-full gap-4 mb-4">
				<div className="w-full sm:w-[200px] h-10 bg-gray-300 rounded animate-pulse"></div>
				<div className="w-full sm:w-[200px] h-10 bg-gray-300 rounded animate-pulse"></div>
			</div>
		</div>
	);
}

export default function CoinsClientPage() {
	const { staticData, userCoinsData, loading, error } = useAppData();

	// Estado de error completo
	if (error) {
		return (
			<section className="px-2 py-4 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
				<div className="text-center py-12">
					<div className="text-red-600 text-lg mb-4">
						❌ Error al cargar la aplicación
					</div>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Intentar de nuevo
					</button>
				</div>
			</section>
		);
	}

	// Estado de carga
	if (loading || !staticData || !userCoinsData) {
		return (
			<section className="px-2 py-4 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
				<FiltersSkeletonSection />
				{/* Skeleton para las monedas */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className="h-96 bg-gray-300 rounded-lg animate-pulse"
						></div>
					))}
				</div>
			</section>
		);
	}

	// Estado de éxito - mostrar la aplicación
	return (
		<section className="px-2 py-4 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
			<FiltersSection
				countries={staticData.countries}
				years={staticData.years}
			/>
			<CoinsContainer
				userCoinsData={userCoinsData}
				countryCodeMap={staticData.countryCodeMap}
			/>
		</section>
	);
}
