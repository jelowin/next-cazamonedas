import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

const TABLE_NAME = "coins";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const year = searchParams.get("year");
	const country = searchParams.get("country");
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "20");

	// Construir la consulta base para contar y filtrar
	let baseQuery = `SELECT * FROM ${TABLE_NAME}`;
	let countQuery = `SELECT COUNT(*) as total FROM ${TABLE_NAME}`;

	// Aplicar filtros
	if (year || country) {
		const whereClause = [];
		if (year) {
			whereClause.push(`year = '${year}'`);
		}
		if (country) {
			whereClause.push(`country = '${country}'`);
		}
		const whereString = ` WHERE ${whereClause.join(" AND ")}`;
		baseQuery += whereString;
		countQuery += whereString;
	}

	// Calcular el offset basado en la página
	const offset = (page - 1) * limit;
	const finalQuery = `${baseQuery} ORDER BY year DESC, country ASC LIMIT ${limit} OFFSET ${offset}`;

	console.log("QUERY", finalQuery);

	try {
		const results = await turso.batch([
			{ sql: finalQuery }, // Monedas con paginación
			{ sql: countQuery }, // Total de monedas (con filtros aplicados)
			{
				sql: `SELECT DISTINCT country FROM ${TABLE_NAME} ORDER BY country ASC`,
			}, // Países
			{ sql: `SELECT DISTINCT year FROM ${TABLE_NAME} ORDER BY year DESC` }, // Años
		]);

		const coins = results[0].rows;
		const totalCoins = (results[1].rows[0]?.total as number) || 0;
		const totalPages = Math.ceil(totalCoins / limit);

		return NextResponse.json({
			coins,
			countries: results[2].rows.map(({ country }) => ({
				label: country as string,
				value: country as string,
			})),
			years: results[3].rows.map(({ year }) => ({
				label: year as string,
				value: year as string,
			})),
			pagination: {
				currentPage: page,
				totalPages,
				totalCoins,
				limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
		});
	} catch (error) {
		console.error("Error al obtener las monedas:", error);
		return new NextResponse("Error interno del servidor", { status: 500 });
	}
}
