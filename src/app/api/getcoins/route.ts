import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

const TABLE_NAME = "coins";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const year = searchParams.get("year");
	const country = searchParams.get("country");
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "20");

	let query = `SELECT * FROM ${TABLE_NAME}`;
	const params = [];

	if (year || country) {
		query += " WHERE";
		if (year) {
			query += ` year = '${year}'`;
			params.push(year);
		}
		if (country) {
			if (year) query += " AND";
			query += ` country = '${country}'`;
			params.push(country);
		}
	}

	// Calcular el offset basado en la página
	const offset = (page - 1) * limit;
	query += ` LIMIT ${limit} OFFSET ${offset}`;
	params.push(limit, offset);
	console.log("QUERY", query);

	try {
		const results = await turso.batch([
			{ sql: `${query}` },
			{ sql: `SELECT DISTINCT country FROM ${TABLE_NAME}` },
			{ sql: `SELECT DISTINCT year FROM ${TABLE_NAME}` },
		]);

		return NextResponse.json({
			coins: results[0].rows,
			countries: results[1].rows.map(({ country }) => {
				return { label: country, value: country };
			}),
			years: results[2].rows.map(({ year }) => {
				return { label: year, value: year };
			}),
		});
	} catch (error) {
		console.error("Error al obtener las monedas:", error);
		return new NextResponse("Error interno del servidor", { status: 500 });
	}
}
