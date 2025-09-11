import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

export async function GET() {
	try {
		// Obtener usuario actual
		const user = await getCurrentUser();

		// Obtener el total de monedas disponibles
		const totalCoinsResult = await turso.execute(
			"SELECT COUNT(*) as total FROM coins"
		);
		const totalCoins = Number(totalCoinsResult.rows[0]?.total) || 0;

		let userCoins = 0;
		if (user) {
			// Obtener el total de monedas del usuario
			const userCoinsResult = await turso.execute({
				sql: "SELECT COUNT(*) as total FROM user_coins WHERE user_id = ?",
				args: [user.uuid],
			});
			userCoins = Number(userCoinsResult.rows[0]?.total) || 0;
		}

		const result = {
			totalCoins: Number(totalCoins),
			userCoins: Number(userCoins),
			percentage:
				totalCoins > 0 ? Math.round((userCoins / totalCoins) * 100) : 0,
		};

		return NextResponse.json(result);
	} catch (error) {
		console.error("Error al obtener estadísticas:", error);
		return NextResponse.json(
			{ error: "Error interno del servidor" },
			{ status: 500 }
		);
	}
}
