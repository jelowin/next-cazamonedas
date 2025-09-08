import React from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

interface CountryFlagProps {
	country: string;
	countryCodeMap?: Record<string, string>;
	className?: string;
}

export default function CountryFlag({
	country,
	countryCodeMap = {},
	className,
}: CountryFlagProps) {
	// Obtener el código del país desde el mapa, o usar un fallback
	const countryCode = countryCodeMap[country] || "US"; // US como fallback

	try {
		const flag = getUnicodeFlagIcon(countryCode);
		return (
			<div
				className={`text-4xl md:text-6xl ${className}`}
				title={`${country} (${countryCode})`}
			>
				{flag}
			</div>
		);
	} catch {
		// Si el código no es válido, mostrar bandera genérica
		console.warn(`Código de país no válido: ${countryCode} para ${country}`);
		return (
			<div className={className} title={`${country}`}>
				🏳️
			</div>
		);
	}
}
