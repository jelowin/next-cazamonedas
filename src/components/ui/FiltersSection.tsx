"use client";

import React from "react";
import { ComboboxNuqs } from "@/components/ui/ComboboxNuqs";
import { useCoinsFilters } from "@/hooks/useCoinsFilters";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FiltersSectionProps {
	countries: { label: string; value: string }[];
	years: { label: string; value: string }[];
}

export default function FiltersSection({
	countries,
	years,
}: FiltersSectionProps) {
	const { clearFilters, selectedCountry, selectedYear } = useCoinsFilters();

	const hasActiveFilters = selectedCountry || selectedYear;

	return (
		<div className="mb-6">
			{/* Filtros */}
			<div className="flex flex-col sm:flex-row w-full gap-4 mb-4">
				<ComboboxNuqs
					data={countries}
					param="country"
					placeholder="Selecciona un país"
					type="string"
				/>
				<ComboboxNuqs
					data={years}
					param="year"
					placeholder="Selecciona un año"
					type="number"
				/>

				{/* Botón para limpiar filtros */}
				{hasActiveFilters && (
					<Button
						variant="outline"
						size="sm"
						onClick={clearFilters}
						className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
					>
						<X className="h-4 w-4" />
						Limpiar filtros
					</Button>
				)}
			</div>

			{/* Información de filtros activos */}
			{hasActiveFilters && (
				<div className="flex flex-wrap gap-2 mb-4">
					{selectedCountry && (
						<div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
							País:{" "}
							{countries.find((c) => c.value === selectedCountry)?.label ||
								selectedCountry}
						</div>
					)}
					{selectedYear && (
						<div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
							Año: {selectedYear}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
