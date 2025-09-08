import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import UserProfile from "@/components/ui/UserProfile";

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
				<p className="text-muted-foreground mt-2">
					Información obtenida después del login exitoso
				</p>
			</div>

			{/* Datos del servidor */}
			<div className="mb-8 p-4 bg-muted rounded-lg">
				<h2 className="text-lg font-semibold mb-2">Datos desde el servidor:</h2>
				<pre className="text-sm bg-background p-3 rounded">
					{JSON.stringify(session, null, 2)}
				</pre>
			</div>

			{/* Componente cliente que usa useAuth */}
			<UserProfile />

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
