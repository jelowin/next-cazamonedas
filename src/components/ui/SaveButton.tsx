"use client";
import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserCoinsData {
	success: boolean;
	data: Array<{
		coin_id: number;
		user_id: string;
	}>;
	user?: {
		uuid: string;
		email: string;
		name: string;
	};
}

interface SaveButtonProps {
	coinId: number;
	userCoinsData: UserCoinsData;
}

export default function SaveButton({ coinId, userCoinsData }: SaveButtonProps) {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const [localUserCoins, setLocalUserCoins] = useState(
		userCoinsData?.data || []
	);

	// Verificar si el usuario ya tiene esta moneda
	const hasCoin = useMemo(() => {
		return localUserCoins.some((userCoin) => userCoin.coin_id === coinId);
	}, [localUserCoins, coinId]);

	const handleSaveCoin = async () => {
		if (!coinId || status !== "authenticated" || isLoading) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/user-coins", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ coinId }),
			});

			if (response.ok) {
				// Agregar la moneda localmente
				setLocalUserCoins((prev) => [
					...prev,
					{ coin_id: coinId, user_id: session?.user?.uuid || "" },
				]);
				console.log("✅ Moneda guardada exitosamente");
			} else {
				const errorText = await response.text();
				console.error("❌ Error al guardar moneda:", errorText);
			}
		} catch (error) {
			console.error("❌ Error de red:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveCoin = async () => {
		if (!coinId || status !== "authenticated" || isLoading) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/user-coins", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ coinId }),
			});

			if (response.ok) {
				// Eliminar la moneda localmente
				setLocalUserCoins((prev) =>
					prev.filter((userCoin) => userCoin.coin_id !== coinId)
				);
				console.log("✅ Moneda eliminada exitosamente");
			} else {
				const errorText = await response.text();
				console.error("❌ Error al eliminar moneda:", errorText);
			}
		} catch (error) {
			console.error("❌ Error de red:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// No mostrar el botón si no está autenticado
	if (status !== "authenticated") {
		return (
			<CardFooter className="flex-1">
				<Button disabled className="w-full h-12">
					Inicia sesión para guardar
				</Button>
			</CardFooter>
		);
	}

	return (
		<CardFooter className="flex-1">
			<Button
				className={`w-full h-12 cursor-pointer ${
					hasCoin
						? "bg-red-600 hover:bg-red-700"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
				onClick={hasCoin ? handleRemoveCoin : handleSaveCoin}
				disabled={isLoading}
			>
				{isLoading ? "..." : hasCoin ? "Eliminar" : "Guardar"}
			</Button>
		</CardFooter>
	);
}
