"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
	countryCodeMap: Record<string, string>;
}

interface AppDataContextType {
	staticData: StaticData | null;
	userCoinsData: UserCoinsData | null;
	loading: boolean;
	error: string | null;
	refreshUserCoins: () => Promise<void>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
	const [staticData, setStaticData] = useState<StaticData | null>(null);
	const [userCoinsData, setUserCoinsData] = useState<UserCoinsData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchStaticData = async () => {
		try {
			setLoading(true);
			setError(null);

			// Realizar peticiones en paralelo
			const [coinsResponse, countryCodesResponse] = await Promise.all([
				fetch("/api/get-coins"), // Solo para obtener países y años
				fetch("/api/country-codes"),
			]);

			// Procesar respuesta inicial de monedas (solo para obtener países/años)
			if (!coinsResponse.ok) {
				throw new Error(
					`Error al cargar datos iniciales: ${coinsResponse.status}`
				);
			}
			const coinsResult = await coinsResponse.json();

			// Procesar códigos de país
			let countryCodeMap: Record<string, string> = {};
			if (countryCodesResponse.ok) {
				const countryCodesResult = await countryCodesResponse.json();
				countryCodeMap = countryCodesResult.data || {};
			}

			setStaticData({
				countries: coinsResult.countries || [],
				years: coinsResult.years || [],
				countryCodeMap,
			});
		} catch (err) {
			console.error("❌ Error fetching static data:", err);
			setError(err instanceof Error ? err.message : "Error desconocido");
		} finally {
			setLoading(false);
		}
	};

	const fetchUserCoins = async () => {
		try {
			const userCoinsResponse = await fetch("/api/get-user-coins");

			let newUserCoinsData: UserCoinsData = { success: false, data: [] };
			if (userCoinsResponse.ok) {
				newUserCoinsData = await userCoinsResponse.json();
			}

			setUserCoinsData(newUserCoinsData);
		} catch (err) {
			console.error("❌ Error fetching user coins:", err);
			setUserCoinsData({ success: false, data: [] });
		}
	};

	const refreshUserCoins = async () => {
		await fetchUserCoins();
	};

	useEffect(() => {
		// Cargar datos estáticos solo una vez
		fetchStaticData();
	}, []);

	useEffect(() => {
		// Cargar datos del usuario cuando los datos estáticos estén listos
		if (staticData) {
			fetchUserCoins();
		}
	}, [staticData]);

	const value: AppDataContextType = {
		staticData,
		userCoinsData,
		loading,
		error,
		refreshUserCoins,
	};

	return (
		<AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
	);
}

export function useAppData() {
	const context = useContext(AppDataContext);
	if (context === undefined) {
		throw new Error("useAppData must be used within an AppDataProvider");
	}
	return context;
}
