import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

/**
 * Helper para obtener el usuario actual en el servidor
 * Úsalo en API routes, Server Components y Server Actions
 */
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
		locale: session.user.locale,
	};
}

/**
 * Helper para verificar si el usuario está autenticado
 * Lanza un error si no está autenticado
 */
export async function requireAuth() {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error("Usuario no autenticado");
	}

	return user;
}

/**
 * Helper para obtener solo el UUID del usuario
 */
export async function getCurrentUserUuid(): Promise<string | null> {
	const user = await getCurrentUser();
	return user?.uuid || null;
}
