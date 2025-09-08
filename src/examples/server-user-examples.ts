// Ejemplos de cómo obtener el ID de usuario en el servidor

// 1. En API Routes (como tu endpoint)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json({ error: "No autorizado" }, { status: 401 });
	}

	const userUuid = session.user.uuid;
	const userEmail = session.user.email;

	console.log("Usuario en API:", { uuid: userUuid, email: userEmail });

	return NextResponse.json({ userId: userUuid });
}

// 2. En Server Components (páginas)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { redirect } from "next/navigation";

export default async function MyServerPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect("/api/auth/signin");
	}

	const userUuid = session.user.uuid;

	// Usar el UUID para cargar datos del usuario
	return (
		<div>
			<h1>Bienvenido, {session.user.name}</h1>
			<p>Tu UUID: {userUuid}</p>
		</div>
	);
}

// 3. En Server Actions
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

export async function saveUserData(formData: FormData) {
	"use server";

	const session = await getServerSession(authOptions);

	if (!session?.user) {
		throw new Error("No autorizado");
	}

	const userUuid = session.user.uuid;

	// Usar el UUID para guardar datos
	console.log("Guardando datos para usuario:", userUuid);
}

// 4. En Middleware (opcional - para rutas protegidas específicas)
import { withAuth } from "next-auth/middleware";

export default withAuth(
	function middleware(req) {
		// req.nextauth.token contiene los datos del usuario
		const userUuid = req.nextauth.token?.uuid;
		console.log("Usuario en middleware:", userUuid);
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

// 5. Helper function para obtener usuario en servidor
export async function getCurrentUser() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return null;
	}

	return {
		uuid: session.user.uuid,
		id: session.user.id,
		email: session.user.email,
		name: session.user.name,
		image: session.user.image,
		verified: session.user.verified_email,
	};
}
