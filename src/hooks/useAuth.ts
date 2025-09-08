"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback } from "react";

export function useAuth() {
	const { data: session, status, update } = useSession();

	const login = useCallback(async (provider: string = "google") => {
		try {
			console.log("🔑 Iniciando login con:", provider);
			await signIn(provider);
		} catch (error) {
			console.error("❌ Error en login:", error);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			console.log("👋 Cerrando sesión...");
			await signOut();
		} catch (error) {
			console.error("❌ Error en logout:", error);
		}
	}, []);

	const refreshSession = useCallback(async () => {
		try {
			console.log("🔄 Actualizando sesión...");
			await update();
		} catch (error) {
			console.error("❌ Error al actualizar sesión:", error);
		}
	}, [update]);

	return {
		// Datos del usuario
		user: session?.user,
		userId: session?.user?.id,
		userUuid: session?.user?.uuid, // UUID único del usuario
		userEmail: session?.user?.email,
		userName: session?.user?.name,
		userImage: session?.user?.image,
		userLocale: session?.user?.locale,
		userVerified: session?.user?.verified_email,

		// Estados
		isAuthenticated: !!session,
		isLoading: status === "loading",
		status,

		// Sesión completa
		session,

		// Métodos de autenticación
		login,
		logout,
		refreshSession,
	};
}
