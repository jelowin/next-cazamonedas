"use client";

import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";

/**
 * Hook para manejar todos los filtros y paginación de las monedas
 * usando nuqs para sincronización automática con la URL
 */
export function useCoinsFilters() {
	const [filters, setFilters] = useQueryStates({
		search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
		country: parseAsString
			.withDefault("")
			.withOptions({ clearOnDefault: true }),
		year: parseAsInteger.withOptions({ clearOnDefault: true }),
		denomination: parseAsString
			.withDefault("")
			.withOptions({ clearOnDefault: true }),
		currency: parseAsString
			.withDefault("")
			.withOptions({ clearOnDefault: true }),
		page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
	});

	// Función para actualizar múltiples filtros y resetear página
	const updateFilters = (updates: Partial<typeof filters>) => {
		// Si se actualiza cualquier filtro excepto la página, resetear a página 1
		const shouldResetPage = Object.keys(updates).some((key) => key !== "page");

		setFilters({
			...updates,
			...(shouldResetPage && updates.page === undefined ? { page: 1 } : {}),
		});
	};

	// Función para limpiar todos los filtros
	const clearFilters = () => {
		setFilters({
			search: "",
			country: "",
			year: null,
			denomination: "",
			currency: "",
			page: 1,
		});
	};

	// Función específica para cambiar de página
	const setPage = (page: number) => {
		setFilters({ page });
	};

	// Función para ir a la página siguiente
	const nextPage = () => {
		setFilters({ page: filters.page + 1 });
	};

	// Función para ir a la página anterior
	const prevPage = () => {
		if (filters.page > 1) {
			setFilters({ page: filters.page - 1 });
		}
	};

	return {
		filters,
		setFilters,
		updateFilters,
		clearFilters,
		setPage,
		nextPage,
		prevPage,
		// Valores individuales para fácil acceso
		currentPage: filters.page,
		searchTerm: filters.search,
		selectedCountry: filters.country,
		selectedYear: filters.year,
		selectedDenomination: filters.denomination,
		selectedCurrency: filters.currency,
	};
}
