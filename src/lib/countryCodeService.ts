import { turso } from "@/lib/turso";

// Cache en memoria para los códigos de país
let countryCodeCache: Record<string, string> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 30; // 1 mes en milisegundos

/**
 * Obtiene los códigos de país con cache en memoria
 * Se actualiza automáticamente cada mes
 */
export async function getCountryCodes(): Promise<Record<string, string>> {
	const now = Date.now();

	// Si tenemos cache válido, lo devolvemos
	if (countryCodeCache && now - cacheTimestamp < CACHE_DURATION) {
		console.log("🚀 Usando códigos de país desde cache");
		return countryCodeCache;
	}

	try {
		console.log("🌍 Obteniendo códigos de país desde base de datos...");

		const query = "SELECT code, country FROM countryCode";
		const results = await turso.execute(query);

		// Convertir a un objeto para fácil lookup
		const countryCodeMap: Record<string, string> = {};
		results.rows.forEach((row: any) => {
			countryCodeMap[row.country] = row.code;
		});

		// Actualizar cache
		countryCodeCache = countryCodeMap;
		cacheTimestamp = now;

		console.log(
			`✅ Cache de códigos de país actualizado con ${
				Object.keys(countryCodeMap).length
			} países`
		);

		return countryCodeMap;
	} catch (error) {
		console.error("❌ Error al obtener códigos de países:", error);

		// Si hay error pero tenemos cache anterior, lo usamos
		if (countryCodeCache) {
			console.warn("⚠️ Usando cache anterior debido a error");
			return countryCodeCache;
		}

		// Si no hay cache, devolver objeto vacío
		return {};
	}
}

/**
 * Limpia el cache manualmente (útil para desarrollo)
 */
export function clearCountryCodeCache(): void {
	countryCodeCache = null;
	cacheTimestamp = 0;
	console.log("🗑️ Cache de códigos de país limpiado");
}
