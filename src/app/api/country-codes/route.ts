import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

export async function GET() {
	try {
		console.log("🌍 Obteniendo códigos de países...");

		const query = "SELECT code, country FROM countryCode";
		const results = await turso.execute(query);

		// Convertir a un objeto para fácil lookup
		const countryCodeMap: Record<string, string> = {};
		results.rows.forEach((row: any) => {
			countryCodeMap[row.country] = row.code;
		});

		return NextResponse.json({
			success: true,
			data: countryCodeMap,
		});
	} catch (error) {
		console.error("❌ Error al obtener códigos de países:", error);
		return new NextResponse("Error interno del servidor", { status: 500 });
	}
}
