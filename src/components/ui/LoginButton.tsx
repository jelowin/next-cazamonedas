"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LoginButton() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<Button variant="outline" disabled>
				Cargando...
			</Button>
		);
	}

	if (session) {
		return (
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
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
					<span className="text-sm font-medium hidden sm:inline">
						{session.user?.name || session.user?.email}
					</span>
				</div>
				<Button variant="outline" size="sm" onClick={() => signOut()}>
					Cerrar sesión
				</Button>
			</div>
		);
	}

	return (
		<Button
			onClick={() => signIn("google")}
			className="bg-blue-600 hover:bg-blue-700"
		>
			Iniciar sesión
		</Button>
	);
}
