"use client";

import React, { useEffect, useState, useMemo, memo } from "react";
import { useCoinsFilters } from "@/hooks/useCoinsFilters";
import CoinsList from "@/components/ui/CoinsList";
import PaginationNuqs from "@/components/ui/PaginationNuqs";

interface Coin {
	id: number;
	country: string;
	year: string;
	imageSrc: string;
	reason: string;
}

interface UserCoinsData {
	success: boolean;
	data: Array<{
		coin_id: number;
		user_id: string;
	}>;
	user?: {
		uuid: string;
		email: string;
		name: string;
	};
}

interface CoinsContainerProps {
	userCoinsData: UserCoinsData;
	countryCodeMap: Record<string, string>;
}

interface CoinsApiResponse {
	coins: Coin[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalCoins: number;
		limit: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
}

/**
 * Skeleton para mostrar mientras cargan las monedas
 */
function CoinsSkeletonGrid() {
	return (
		<div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{Array.from({ length: 12 }).map((_, index) => (
				<div
					key={index}
					className="rounded-lg shadow-md bg-slate-50 animate-pulse"
				>
					<div className="p-2 sm:p-4">
						<div className="flex justify-between items-start mb-2 sm:mb-4">
							<div className="space-y-2">
								<div className="h-4 sm:h-6 bg-gray-300 rounded w-20 sm:w-24"></div>
								<div className="h-4 sm:h-5 bg-gray-300 rounded w-12 sm:w-16"></div>
							</div>
							<div className="h-8 w-8 sm:h-12 sm:w-12 bg-gray-300 rounded"></div>
						</div>
						<div className="h-32 sm:h-48 bg-gray-300 rounded mb-2 sm:mb-4 max-w-[180px] sm:max-w-none mx-auto"></div>
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 rounded"></div>
							<div className="h-4 bg-gray-300 rounded w-3/4"></div>
						</div>
					</div>
					<div className="h-8 sm:h-12 bg-gray-200 rounded-b-lg"></div>
				</div>
			))}
		</div>
	);
}

/**
 * Skeleton para la paginación
 */
function PaginationSkeleton() {
	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
			<div className="flex items-center gap-2">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className="w-9 h-9 bg-gray-300 rounded animate-pulse"
					></div>
				))}
			</div>
		</div>
	);
}

function CoinsContainer({
	userCoinsData,
	countryCodeMap,
}: CoinsContainerProps) {
	const { filters } = useCoinsFilters();
	const [coinsData, setCoinsData] = useState<CoinsApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Función para construir la URL de la API - memoizada para evitar recálculos
	const buildApiUrl = useMemo(() => {
		return (filterParams: {
			country: string;
			year: number | null;
			page: number;
		}) => {
			const params = new URLSearchParams();

			if (filterParams.country) params.set("country", filterParams.country);
			if (filterParams.year) params.set("year", filterParams.year.toString());
			if (filterParams.page > 1)
				params.set("page", filterParams.page.toString());

			return `/api/get-coins${
				params.toString() ? `?${params.toString()}` : ""
			}`;
		};
	}, []); // No dependencies - esta función no cambia

	// Cargar monedas cuando cambien los filtros
	useEffect(() => {
		const fetchCoins = async () => {
			try {
				setLoading(true);
				setError(null);

				const coinsUrl = buildApiUrl(filters);
				console.log("🔄 Fetching coins with filters:", filters);
				console.log("🌐 Coins URL:", coinsUrl);

				const coinsResponse = await fetch(coinsUrl);

				if (!coinsResponse.ok) {
					throw new Error(`Error al cargar monedas: ${coinsResponse.status}`);
				}

				const coinsResult = await coinsResponse.json();
				setCoinsData(coinsResult);
			} catch (err) {
				console.error("❌ Error fetching coins:", err);
				setError(err instanceof Error ? err.message : "Error desconocido");
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();
	}, [filters, buildApiUrl]); // Re-ejecutar solo cuando cambien los filtros

	// Estado de error
	if (error) {
		return (
			<div className="text-center py-12">
				<div className="text-red-600 text-lg mb-4">
					❌ Error al cargar las monedas
				</div>
				<p className="text-gray-600 mb-4">{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Intentar de nuevo
				</button>
			</div>
		);
	}

	// Estado de carga
	if (loading || !coinsData) {
		return (
			<>
				<CoinsSkeletonGrid />
				<PaginationSkeleton />
			</>
		);
	}

	// Estado normal con datos
	return (
		<>
			{/* Lista de monedas */}
			<CoinsList
				coins={coinsData.coins}
				userCoinsData={userCoinsData}
				countryCodeMap={countryCodeMap}
			/>

			{/* Paginación */}
			<PaginationNuqs
				totalPages={coinsData.pagination.totalPages}
				totalCoins={coinsData.pagination.totalCoins}
			/>
		</>
	);
}

// Optimizar el componente para evitar re-renderizados innecesarios
export default memo(CoinsContainer);
