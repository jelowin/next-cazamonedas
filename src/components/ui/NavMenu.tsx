"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				<Popover>
					<PopoverTrigger>
						<Avatar>
							<AvatarImage src={session?.user?.image ?? ""} />
							<AvatarFallback>{session?.user?.name ?? ""}</AvatarFallback>
						</Avatar>
					</PopoverTrigger>
					<PopoverContent className="flex flex-col justify-end gap-4">
						<p>Hola, {session?.user?.name}</p>
						<hr />
						<Button onClick={() => signOut()}>Cerrar sesión</Button>
					</PopoverContent>
				</Popover>
			</>
		);
	}

	return (
		<>
			<Button className="font-bold" onClick={() => signIn()}>
				Iniciar sesión
			</Button>
		</>
	);
}

export default function NavMenu() {
	return (
		<header className="bg-white mb-10 flex items-center justify-end sticky top-0 h-[55px] border-b px-8">
			<AuthButton />
		</header>
	);
}
