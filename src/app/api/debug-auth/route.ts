import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {
	try {
		console.log("🔍 Debugging auth...");

		// 1. Obtener la sesión raw
		const session = await getServerSession(authOptions);
		console.log("Session raw:", session);

		// 2. Usar el helper
		const user = await getCurrentUser();
		console.log("User from helper:", user);

		return NextResponse.json({
			debug: {
				hasSession: !!session,
				hasUser: !!user,
				sessionUser: session?.user || null,
				helperUser: user || null,
			},
		});
	} catch (error) {
		console.error("❌ Error en debug:", error);
		return NextResponse.json(
			{
				error: "Error en debug",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
