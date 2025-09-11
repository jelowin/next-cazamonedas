"use client";

import { useState, useEffect } from "react";
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

export function useStats() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/stats");
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Error fetching stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, [session]); // Recargar cuando cambie la sesión

	return { stats, loading };
}

export function useCountryStats() {
	const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchCountryStats = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/stats/countries");
				if (response.ok) {
					const data = await response.json();
					setCountryStats(data);
				}
			} catch (error) {
				console.error("Error fetching country stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCountryStats();
	}, [session]); // Recargar cuando cambie la sesión

	return { countryStats, loading };
}
