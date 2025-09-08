import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

const TABLE_NAME = "user_coins";

// POST - Agregar moneda al usuario
export async function POST(request: Request) {
	try {
		const { coinId } = await request.json();

		if (!coinId) {
			return new NextResponse("coinId es requerido", { status: 400 });
		}

		// Obtener el usuario actual
		const user = await getCurrentUser();
		if (!user) {
			return new NextResponse("No autorizado", { status: 401 });
		}

		console.log("💰 Guardando moneda para usuario:", {
			uuid: user.uuid,
			coinId,
		});

		// Verificar si ya existe la relación
		const existingQuery = `SELECT * FROM ${TABLE_NAME} WHERE user_id = ? AND coin_id = ?`;
		const existing = await turso.execute(existingQuery, [user.uuid, coinId]);

		if (existing.rows.length > 0) {
			return new NextResponse("La moneda ya está guardada", { status: 409 });
		}

		// Insertar la nueva relación
		const insertQuery = `INSERT INTO ${TABLE_NAME} (user_id, coin_id) VALUES (?, ?)`;
		await turso.execute(insertQuery, [user.uuid, coinId]);

		return NextResponse.json({
			success: true,
			message: "Moneda guardada exitosamente",
		});
	} catch (error) {
		console.error("❌ Error al guardar moneda:", error);
		return new NextResponse("Error interno del servidor", { status: 500 });
	}
}

// DELETE - Eliminar moneda del usuario
export async function DELETE(request: Request) {
	try {
		const { coinId } = await request.json();

		if (!coinId) {
			return new NextResponse("coinId es requerido", { status: 400 });
		}

		// Obtener el usuario actual
		const user = await getCurrentUser();
		if (!user) {
			return new NextResponse("No autorizado", { status: 401 });
		}

		console.log("🗑️ Eliminando moneda para usuario:", {
			uuid: user.uuid,
			coinId,
		});

		// Eliminar la relación
		const deleteQuery = `DELETE FROM ${TABLE_NAME} WHERE user_id = ? AND coin_id = ?`;
		const result = await turso.execute(deleteQuery, [user.uuid, coinId]);

		if (result.rowsAffected === 0) {
			return new NextResponse("Moneda no encontrada", { status: 404 });
		}

		return NextResponse.json({
			success: true,
			message: "Moneda eliminada exitosamente",
		});
	} catch (error) {
		console.error("❌ Error al eliminar moneda:", error);
		return new NextResponse("Error interno del servidor", { status: 500 });
	}
}
