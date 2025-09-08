"use client";

import { useState, useEffect } from "react";

// Hook para obtener códigos de país en componentes cliente
export function useCountryCodes() {
	const [countryCodeMap, setCountryCodeMap] = useState<Record<string, string>>(
		{}
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCountryCodes() {
			try {
				const response = await fetch("/api/country-codes", {
					credentials: "include",
				});

				if (response.ok) {
					const data = await response.json();
					setCountryCodeMap(data.data || {});
				} else {
					setError("No se pudieron obtener los códigos de países");
				}
			} catch (err) {
				setError("Error de red al obtener códigos de países");
				console.error("Error fetching country codes:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchCountryCodes();
	}, []);

	return { countryCodeMap, loading, error };
}
