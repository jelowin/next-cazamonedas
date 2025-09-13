"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserDrawer from "@/components/ui/UserDrawer";

export default function LoginButton() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<Button
				variant="outline"
				disabled
				className="font-inter group relative px-3 py-2 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 font-semibold"
			>
				<span className="text-gray-500 dark:text-gray-400 font-semibold">
					Cargando...
				</span>
			</Button>
		);
	}

	if (session) {
		return (
			<>
				{/* Vista Mobile - Solo avatar con drawer */}
				<div className="sm:hidden">
					<UserDrawer>
						<Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-110 transition-all duration-300 border-2 border-white/50 shadow-md">
							<AvatarImage
								src={session.user?.image || ""}
								alt={session.user?.name || ""}
							/>
							<AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
								{session.user?.name?.charAt(0) ||
									session.user?.email?.charAt(0) ||
									"U"}
							</AvatarFallback>
						</Avatar>
					</UserDrawer>
				</div>

				{/* Vista Desktop - Layout completo */}
				<div className="hidden sm:flex items-center gap-3 group">
					<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-200/50 shadow-sm hover:shadow-md hover:from-blue-50 hover:to-purple-50 hover:border-blue-200/50 transition-all duration-300">
						<Avatar className="h-8 w-8 border-2 border-white shadow-sm">
							<AvatarImage
								src={session.user?.image || ""}
								alt={session.user?.name || ""}
							/>
							<AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-xs">
								{session.user?.name?.charAt(0) ||
									session.user?.email?.charAt(0) ||
									"U"}
							</AvatarFallback>
						</Avatar>
						<span className="font-inter text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
							{session.user?.name || session.user?.email}
						</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => signOut()}
						className="font-inter group relative px-3 py-1.5 rounded-lg border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 hover:shadow-md hover:shadow-red-200/50 transition-all duration-300 font-semibold"
					>
						<span className="relative z-10 font-semibold">Cerrar sesión</span>
						{/* Efecto de brillo sutil */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-lg" />
					</Button>
				</div>
			</>
		);
	}

	return (
		<Button
			onClick={() => signIn("google")}
			className="font-inter group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 overflow-hidden"
		>
			<span className="relative z-10 font-semibold">Iniciar sesión</span>
			{/* Efecto de brillo animado */}
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
		</Button>
	);
}
