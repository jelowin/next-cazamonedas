import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
	// Obtener la sesión en el servidor
	const session = await getServerSession(authOptions);

	// Redirigir si no está autenticado
	if (!session) {
		redirect("/api/auth/signin");
	}

	// Logs en el servidor
	console.log("📄 Página de perfil cargada para:", session.user?.email);

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold">Mi Perfil</h1>
				<p className="text-muted-foreground mt-2">Información de tu cuenta</p>
			</div>

			{/* Información del usuario */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="flex items-center gap-3">
						<Avatar className="h-12 w-12">
							<AvatarImage
								src={session.user?.image || ""}
								alt={session.user?.name || ""}
							/>
							<AvatarFallback>
								{session.user?.name?.charAt(0) ||
									session.user?.email?.charAt(0) ||
									"U"}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="text-xl font-bold">
								{session.user?.name || "Usuario"}
							</div>
							<div className="text-sm text-muted-foreground">
								{session.user?.email}
							</div>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div>
							<span className="font-medium">Estado de verificación:</span>
							<Badge variant="secondary" className="ml-2">
								{session.user?.email ? "Verificado" : "No verificado"}
							</Badge>
						</div>
						<div>
							<span className="font-medium">Método de autenticación:</span>
							<span className="ml-2">Google OAuth</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Ejemplo de uso de datos específicos */}
			<div className="mt-8 grid gap-4 md:grid-cols-2">
				<div className="p-4 border rounded-lg">
					<h3 className="font-medium mb-2">
						Personalización basada en usuario
					</h3>
					<p className="text-sm text-muted-foreground">
						Hola <strong>{session.user?.name}</strong>, aquí puedes personalizar
						el contenido basado en los datos del usuario obtenidos en los
						callbacks.
					</p>
				</div>

				<div className="p-4 border rounded-lg">
					<h3 className="font-medium mb-2">Acciones del usuario</h3>
					<p className="text-sm text-muted-foreground">
						User ID:{" "}
						<code className="bg-muted px-1 rounded">{session.user?.id}</code>
						<br />
						Email verificado: {session.user?.verified_email ? "✅" : "❌"}
					</p>
				</div>
			</div>
		</div>
	);
}
