"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Coins, LogOut, User, BarChart3 } from "lucide-react";
import StatsDisplay from "@/components/ui/StatsDisplay";

interface UserDrawerProps {
	children: React.ReactNode;
}

export default function UserDrawer({ children }: UserDrawerProps) {
	const { data: session } = useSession();

	if (!session) {
		return <>{children}</>;
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent side="right" className="w-[300px] sm:w-[400px]">
				<SheetHeader>
					<SheetTitle className="flex items-center gap-3">
						<Avatar className="h-10 w-10">
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
						<div className="text-left">
							<div className="font-semibold">
								{session.user?.name || "Usuario"}
							</div>
							<div className="text-sm text-muted-foreground font-normal">
								{session.user?.email}
							</div>
						</div>
					</SheetTitle>
					<SheetDescription>
						Administra tu cuenta y navega por la aplicación
					</SheetDescription>
				</SheetHeader>

				<div className="mt-6 space-y-4">
					{/* Estadísticas */}
					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
							Estadísticas
						</h3>
						<div className="bg-accent/30 rounded-lg p-3">
							<StatsDisplay />
						</div>
					</div>

					{/* Navegación */}
					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
							Navegación
						</h3>
						<Link
							href="/coins"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
						>
							<Coins className="h-4 w-4" />
							Explorar Monedas
						</Link>
						<Link
							href="/stats"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
						>
							<BarChart3 className="h-4 w-4" />
							Estadísticas por País
						</Link>
						<Link
							href="/"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
						>
							<User className="h-4 w-4" />
							Inicio
						</Link>
					</div>

					{/* Cuenta */}
					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
							Cuenta
						</h3>
						<div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
							<User className="h-4 w-4" />
							<div>
								<div className="font-medium">{session.user?.name}</div>
								<div className="text-xs text-muted-foreground">
									{session.user?.email}
								</div>
							</div>
						</div>
					</div>

					{/* Acciones */}
					<div className="pt-4 border-t">
						<Button
							variant="outline"
							size="sm"
							onClick={() => signOut()}
							className="w-full flex items-center gap-2 justify-center"
						>
							<LogOut className="h-4 w-4" />
							Cerrar sesión
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
