"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UserProfile() {
	const {
		user,
		userId,
		userUuid,
		userEmail,
		userName,
		userImage,
		userLocale,
		userVerified,
		isAuthenticated,
		isLoading,
		login,
		logout,
		refreshSession,
	} = useAuth();

	// Este useEffect se ejecutará cuando el usuario cambie
	useEffect(() => {
		if (isAuthenticated && user) {
			console.log("👤 Datos del usuario obtenidos:", {
				id: userId,
				uuid: userUuid,
				email: userEmail,
				name: userName,
				verified: userVerified,
				locale: userLocale,
			});

			// Aquí puedes ejecutar lógica adicional después del login
			// Por ejemplo: cargar datos del usuario, enviar analytics, etc.
		}
	}, [
		isAuthenticated,
		user,
		userId,
		userUuid,
		userEmail,
		userName,
		userVerified,
		userLocale,
	]);

	if (isLoading) {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardContent className="flex items-center justify-center h-32">
					<p>Cargando...</p>
				</CardContent>
			</Card>
		);
	}

	if (!isAuthenticated) {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>No autenticado</CardTitle>
					<CardDescription>Inicia sesión para ver tu perfil</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => login()} className="w-full">
						Iniciar sesión con Google
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<Avatar>
						<AvatarImage src={userImage || ""} alt={userName || ""} />
						<AvatarFallback>
							{userName?.charAt(0) || userEmail?.charAt(0) || "U"}
						</AvatarFallback>
					</Avatar>
					Perfil de Usuario
				</CardTitle>
				<CardDescription>
					Información obtenida después del login
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<label className="text-sm font-medium">Nombre:</label>
					<p className="text-sm text-muted-foreground">
						{userName || "No disponible"}
					</p>
				</div>

				<div>
					<label className="text-sm font-medium">Email:</label>
					<div className="flex items-center gap-2">
						<p className="text-sm text-muted-foreground">{userEmail}</p>
						{userVerified && (
							<Badge variant="secondary" className="text-xs">
								Verificado
							</Badge>
						)}
					</div>
				</div>

				<div>
					<label className="text-sm font-medium">UUID del Usuario:</label>
					<p className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded">
						{userUuid || "No disponible"}
					</p>
				</div>

				<div>
					<label className="text-sm font-medium">ID de Usuario (Google):</label>
					<p className="text-xs font-mono text-muted-foreground">{userId}</p>
				</div>

				{userLocale && (
					<div>
						<label className="text-sm font-medium">Idioma:</label>
						<p className="text-sm text-muted-foreground">{userLocale}</p>
					</div>
				)}

				<div className="flex gap-2 pt-4">
					<Button variant="outline" size="sm" onClick={refreshSession}>
						Actualizar Sesión
					</Button>
					<Button variant="destructive" size="sm" onClick={logout}>
						Cerrar Sesión
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
