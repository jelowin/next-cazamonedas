import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

interface CountryStats {
	country: string;
	totalCoins: number;
	userCoins: number;
	percentage: number;
}

export async function GET() {
	try {
		console.log("🔄 Iniciando obtención de estadísticas por país...");

		// Obtener usuario actual
		const user = await getCurrentUser();
		console.log("👤 Usuario obtenido:", user ? user.uuid : "no autenticado");

		// Obtener el total de monedas por país
		console.log("🔄 Obteniendo total de monedas por país...");
		const totalByCountryResult = await turso.execute(`
			SELECT country, COUNT(*) as total
			FROM coins
			GROUP BY country
			ORDER BY country
		`);
		console.log("📊 Países encontrados:", totalByCountryResult.rows.length);

		const stats: CountryStats[] = [];

		for (const row of totalByCountryResult.rows) {
			const country = row.country as string;
			const totalCoins = Number(row.total);

			let userCoins = 0;
			if (user) {
				console.log(`🔄 Obteniendo monedas del usuario para ${country}...`);
				// Obtener monedas del usuario para este país
				const userCoinsResult = await turso.execute({
					sql: `
						SELECT COUNT(*) as total
						FROM user_coins uc
						JOIN coins c ON uc.coin_id = c.id
						WHERE uc.user_id = ? AND c.country = ?
					`,
					args: [user.uuid, country],
				});
				userCoins = Number(userCoinsResult.rows[0]?.total) || 0;
				console.log(`📈 ${country}: total=${totalCoins}, user=${userCoins}`);
			}

			const percentage =
				totalCoins > 0 ? Math.round((userCoins / totalCoins) * 100) : 0;

			stats.push({
				country,
				totalCoins,
				userCoins,
				percentage,
			});
		}

		console.log("✅ Estadísticas por país obtenidas:", stats.length, "países");
		return NextResponse.json(stats);
	} catch (error) {
		console.error("❌ Error al obtener estadísticas por país:", error);
		return NextResponse.json(
			{ error: "Error interno del servidor" },
			{ status: 500 }
		);
	}
}
