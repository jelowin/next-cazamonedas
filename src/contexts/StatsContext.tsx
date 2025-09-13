"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Stats {
	totalCoins: number;
	userCoins: number;
	percentage: number;
}

interface CountryStats {
	country: string;
	totalCoins: number;
	userCoins: number;
	percentage: number;
}

interface StatsContextType {
	stats: Stats | null;
	countryStats: CountryStats[];
	loading: boolean;
	refreshStats: () => Promise<void>;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
	const [stats, setStats] = useState<Stats | null>(null);
	const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	const fetchStats = async () => {
		try {
			setLoading(true);

			// Hacer ambas peticiones en paralelo
			const [statsResponse, countryStatsResponse] = await Promise.all([
				fetch("/api/stats"),
				fetch("/api/stats/countries"),
			]);

			if (statsResponse.ok) {
				const statsData = await statsResponse.json();
				setStats(statsData);
			}

			if (countryStatsResponse.ok) {
				const countryData = await countryStatsResponse.json();
				setCountryStats(countryData);
			}
		} catch (error) {
			console.error("Error fetching stats:", error);
		} finally {
			setLoading(false);
		}
	};

	const refreshStats = async () => {
		await fetchStats();
	};

	useEffect(() => {
		fetchStats();
	}, [session]); // Recargar cuando cambie la sesión

	const value: StatsContextType = {
		stats,
		countryStats,
		loading,
		refreshStats,
	};

	return (
		<StatsContext.Provider value={value}>{children}</StatsContext.Provider>
	);
}

export function useStats() {
	const context = useContext(StatsContext);
	if (context === undefined) {
		throw new Error("useStats must be used within a StatsProvider");
	}
	return {
		stats: context.stats,
		loading: context.loading,
		refreshStats: context.refreshStats,
	};
}

export function useCountryStats() {
	const context = useContext(StatsContext);
	if (context === undefined) {
		throw new Error("useCountryStats must be used within a StatsProvider");
	}
	return {
		countryStats: context.countryStats,
		loading: context.loading,
		refreshStats: context.refreshStats,
	};
}
