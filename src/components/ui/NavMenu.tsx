"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				{session?.user?.name} <br />
				<button onClick={() => signOut()}>Cerrar sesión</button>
			</>
		);
	}

	return (
		<>
			<button onClick={() => signIn()}>Iniciar sesión</button>
		</>
	);
}

export default function NavMenu() {
	return (
		<header className="flex items-center justify-end sticky top-0 h-[65px] border-b px-8">
			<AuthButton />
		</header>
	);
}
