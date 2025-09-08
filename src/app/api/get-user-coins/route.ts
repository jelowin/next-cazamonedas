import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

const TABLE_NAME = "user_coins";

export async function GET() {
	try {
		// Obtener el usuario actual usando el helper
		const user = await getCurrentUser();

		console.log("USER----", user);

		// Verificar si el usuario está autenticado
		if (!user) {
			return new NextResponse("No autorizado", { status: 401 });
		}

		console.log("🔍 Obteniendo monedas para usuario:", {
			uuid: user.uuid,
			email: user.email,
		});

		// Query usando UUID del usuario
		const query = `SELECT * FROM ${TABLE_NAME} WHERE user_id = ?`;
		const results = await turso.execute(query, [user.uuid]);

		return NextResponse.json({
			success: true,
			data: results.rows,
			user: {
				uuid: user.uuid,
				email: user.email,
				name: user.name,
			},
		});
	} catch (error) {
		console.error("❌ Error al obtener las monedas:", error);
		return new NextResponse("Error interno del servidor", { status: 500 });
	}
}
