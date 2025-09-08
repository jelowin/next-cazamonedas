"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/lib/userService";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function UserActions() {
	const { userUuid, userEmail, isAuthenticated } = useAuth();

	const handleLoadUserData = async () => {
		if (!userUuid) {
			console.log("❌ No hay UUID de usuario");
			return;
		}

		try {
			console.log("🔍 Buscando usuario por UUID:", userUuid);
			const userData = await UserService.findByUuid(userUuid);

			if (userData) {
				console.log("✅ Datos del usuario desde la DB:", userData);
				alert(
					`Usuario encontrado: ${userData.email}\nUUID: ${userData.uuid}\nÚltimo login: ${userData.last_login}`
				);
			} else {
				console.log("❌ Usuario no encontrado");
				alert("Usuario no encontrado en la base de datos");
			}
		} catch (error) {
			console.error("❌ Error cargando datos del usuario:", error);
			alert("Error cargando datos del usuario");
		}
	};

	const handleLoadUserByEmail = async () => {
		if (!userEmail) {
			console.log("❌ No hay email de usuario");
			return;
		}

		try {
			console.log("🔍 Buscando usuario por email:", userEmail);
			const userData = await UserService.findByEmail(userEmail);

			if (userData) {
				console.log("✅ Datos del usuario desde la DB:", userData);
				alert(
					`Usuario encontrado: ${userData.email}\nUUID: ${userData.uuid}\nCreado: ${userData.created_at}`
				);
			} else {
				console.log("❌ Usuario no encontrado");
				alert("Usuario no encontrado en la base de datos");
			}
		} catch (error) {
			console.error("❌ Error cargando datos del usuario:", error);
			alert("Error cargando datos del usuario");
		}
	};

	if (!isAuthenticated) {
		return (
			<Card>
				<CardContent className="pt-6">
					<p>Debes estar autenticado para usar estas funciones.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Acciones del Usuario</CardTitle>
				<CardDescription>
					Ejemplos de cómo usar el UUID del usuario para interactuar con la base
					de datos
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<p className="text-sm text-muted-foreground mb-2">
						Tu UUID: <code className="bg-muted px-1 rounded">{userUuid}</code>
					</p>
				</div>

				<div className="flex gap-2">
					<Button onClick={handleLoadUserData} variant="outline">
						Buscar por UUID
					</Button>
					<Button onClick={handleLoadUserByEmail} variant="outline">
						Buscar por Email
					</Button>
				</div>

				<div className="text-xs text-muted-foreground">
					<p>
						💡 <strong>Tip:</strong> El UUID es único e inmutable, perfecto
						para:
					</p>
					<ul className="list-disc ml-4 mt-1">
						<li>URLs de perfil de usuario (/user/{userUuid})</li>
						<li>
							Referencias en otras tablas (user_coins, user_preferences, etc.)
						</li>
						<li>APIs públicas sin exponer datos sensibles</li>
						<li>Sistemas de cache por usuario</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
