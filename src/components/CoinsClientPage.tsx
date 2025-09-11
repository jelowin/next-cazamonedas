"use client";

import React, { useEffect, useState } from "react";
import FiltersSection from "@/components/ui/FiltersSection";
import CoinsContainer from "@/components/ui/CoinsContainer";

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

interface StaticData {
	countries: { label: string; value: string }[];
	years: { label: string; value: string }[];
	userCoinsData: UserCoinsData;
	countryCodeMap: Record<string, string>;
}

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
	const [staticData, setStaticData] = useState<StaticData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Cargar datos estáticos solo una vez al montar el componente
	useEffect(() => {
		const fetchStaticData = async () => {
			try {
				setLoading(true);
				setError(null);

				console.log("🔄 Fetching static data (countries, years, user data)...");

				// Realizar peticiones en paralelo
				const [coinsResponse, userCoinsResponse, countryCodesResponse] =
					await Promise.all([
						fetch("/api/get-coins"), // Solo para obtener países y años
						fetch("/api/get-user-coins"),
						fetch("/api/country-codes"),
					]);

				// Procesar respuesta inicial de monedas (solo para obtener países/años)
				if (!coinsResponse.ok) {
					throw new Error(
						`Error al cargar datos iniciales: ${coinsResponse.status}`
					);
				}
				const coinsResult = await coinsResponse.json();

				// Procesar respuesta de monedas del usuario (puede fallar si no está autenticado)
				let userCoinsData: UserCoinsData = { success: false, data: [] };
				if (userCoinsResponse.ok) {
					userCoinsData = await userCoinsResponse.json();
				} else {
					console.warn("🔒 Usuario no autenticado, usando datos vacíos");
				}

				// Procesar códigos de país
				let countryCodeMap: Record<string, string> = {};
				if (countryCodesResponse.ok) {
					const countryCodesResult = await countryCodesResponse.json();
					countryCodeMap = countryCodesResult.data || {};
				}

				setStaticData({
					countries: coinsResult.countries || [],
					years: coinsResult.years || [],
					userCoinsData,
					countryCodeMap,
				});
			} catch (err) {
				console.error("❌ Error fetching static data:", err);
				setError(err instanceof Error ? err.message : "Error desconocido");
			} finally {
				setLoading(false);
			}
		};

		fetchStaticData();
	}, []); // Solo ejecutar una vez al montar

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

	// Estado de carga inicial
	if (loading || !staticData) {
		return (
			<section className="px-2 py-4 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
				<div className="flex justify-center items-center min-h-[200px] mb-6">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					<span className="ml-3 text-lg">Cargando aplicación...</span>
				</div>
				<FiltersSkeletonSection />
			</section>
		);
	}

	// Estado normal con datos estáticos cargados
	return (
		<section className="px-2 py-4 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
			{/* Información de debug (solo en desarrollo) */}
			{process.env.NODE_ENV === "development" && (
				<div className="mb-4 p-2 bg-green-100 rounded text-xs">
					<strong>Debug:</strong> Datos estáticos cargados. Los filtros y
					paginación ya no recargarán toda la página.
				</div>
			)}

			{/* Filtros (siempre estables) */}
			<FiltersSection
				countries={staticData.countries}
				years={staticData.years}
			/>

			{/* Contenedor de monedas (maneja su propio loading) */}
			<CoinsContainer
				userCoinsData={staticData.userCoinsData}
				countryCodeMap={staticData.countryCodeMap}
			/>
		</section>
	);
}
