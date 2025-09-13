"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
	onUserCoinsChange?: (
		newUserCoins: Array<{ coin_id: number; user_id: string }>
	) => void;
}

interface Particle {
	id: number;
	x: number;
	y: number;
	delay: number;
	size: number;
}

export default function SaveButton({
	coinId,
	userCoinsData,
	onUserCoinsChange,
}: SaveButtonProps) {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const [localUserCoins, setLocalUserCoins] = useState(
		userCoinsData?.data || []
	);
	const [showParticles, setShowParticles] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Verificar si el usuario ya tiene esta moneda
	const hasCoin = useMemo(() => {
		return localUserCoins.some((userCoin) => userCoin.coin_id === coinId);
	}, [localUserCoins, coinId]);

	// Generar partículas aleatorias
	const generateParticles = useCallback((): Particle[] => {
		return Array.from({ length: 8 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: i * 100,
			size: 0.5 + Math.random() * 0.5,
		}));
	}, []);

	const particles = useMemo(() => generateParticles(), [generateParticles]);

	const handleSaveCoin = async () => {
		if (!coinId || status !== "authenticated" || isLoading) {
			return;
		}

		setIsLoading(true);
		setIsAnimating(true);

		// Activar partículas solo cuando se guarda (no cuando ya está guardado)
		if (!hasCoin) {
			setShowParticles(true);
			// Ocultar partículas después de la animación
			setTimeout(() => setShowParticles(false), 1800);
		}

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
				const newUserCoins = [
					...localUserCoins,
					{ coin_id: coinId, user_id: session?.user?.uuid || "" },
				];
				setLocalUserCoins(newUserCoins);
				// Notificar al componente padre sobre el cambio
				onUserCoinsChange?.(newUserCoins);
				console.log("✅ Moneda guardada exitosamente");
			} else {
				const errorText = await response.text();
				console.error("❌ Error al guardar moneda:", errorText);
			}
		} catch (error) {
			console.error("❌ Error de red:", error);
		} finally {
			setIsLoading(false);
			setTimeout(() => setIsAnimating(false), 600);
		}
	};

	const handleRemoveCoin = async () => {
		if (!coinId || status !== "authenticated" || isLoading) {
			return;
		}

		setIsLoading(true);
		setIsAnimating(true);

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
				const newUserCoins = localUserCoins.filter(
					(userCoin) => userCoin.coin_id !== coinId
				);
				setLocalUserCoins(newUserCoins);
				// Notificar al componente padre sobre el cambio
				onUserCoinsChange?.(newUserCoins);
				console.log("✅ Moneda eliminada exitosamente");
			} else {
				const errorText = await response.text();
				console.error("❌ Error al eliminar moneda:", errorText);
			}
		} catch (error) {
			console.error("❌ Error de red:", error);
		} finally {
			setIsLoading(false);
			setTimeout(() => setIsAnimating(false), 600);
		}
	};

	// No mostrar el botón si no está autenticado
	if (status !== "authenticated") {
		return (
			<Button
				disabled
				className="w-full h-10 sm:h-11 text-sm sm:text-base font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 cursor-not-allowed"
			>
				Inicia sesión para guardar
			</Button>
		);
	}

	return (
		<div className="relative w-full">
			{/* Partículas doradas con Framer Motion */}
			<AnimatePresence>
				{showParticles && (
					<motion.div
						className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{particles.map((particle) => (
							<motion.div
								key={particle.id}
								className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600 rounded-full shadow-lg"
								style={{
									left: `${particle.x}%`,
									top: `${particle.y}%`,
								}}
								initial={{
									scale: 0,
									opacity: 0,
									rotate: 0,
									y: 0,
								}}
								animate={{
									scale: [0, 1.5, 1, 0.5, 0],
									opacity: [0, 1, 1, 0.7, 0],
									rotate: [0, 180, 360],
									y: [0, -30, -60, -80, -100],
									x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
								}}
								transition={{
									duration: 1.2,
									delay: particle.delay / 1000,
									ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
								}}
								exit={{
									scale: 0,
									opacity: 0,
								}}
							/>
						))}

						{/* Efecto de explosión central más rápido */}
						<motion.div
							className="absolute inset-0 bg-gradient-radial from-yellow-400/50 via-amber-500/30 dark:from-yellow-500/40 dark:via-amber-600/25 to-transparent"
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: [0, 0.8, 1.5, 2],
								opacity: [0, 0.8, 0.4, 0],
							}}
							transition={{
								duration: 0.8,
								ease: "easeOut",
							}}
							exit={{ scale: 0, opacity: 0 }}
						/>

						{/* Ondas de impacto */}
						{[...Array(3)].map((_, i) => (
							<motion.div
								key={`wave-${i}`}
								className="absolute inset-0 border-2 border-yellow-400/40 rounded-full"
								initial={{ scale: 0, opacity: 0 }}
								animate={{
									scale: [0, 1, 2, 3],
									opacity: [0, 0.6, 0.3, 0],
								}}
								transition={{
									duration: 1,
									delay: i * 0.1,
									ease: "easeOut",
								}}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Botón con animaciones Framer Motion */}
			<motion.div
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				animate={
					isAnimating
						? {
								scale: [1, 1.05, 1],
								boxShadow: [
									"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									"0 10px 15px -3px rgba(251, 191, 36, 0.3)",
									"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
								],
						  }
						: {}
				}
				transition={{ duration: 0.3 }}
			>
				<Button
					className={`
						group relative w-full h-10 sm:h-11 text-sm sm:text-base font-medium rounded-lg
						transition-all duration-300 ease-out
						border-0 shadow-sm hover:shadow-lg overflow-hidden
						${
							hasCoin
								? "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 dark:from-yellow-500 dark:via-amber-600 dark:to-yellow-700 text-white shadow-lg hover:shadow-xl hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 dark:hover:from-yellow-600 dark:hover:via-amber-700 dark:hover:to-yellow-800"
								: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white"
						}
						${isLoading || isAnimating ? "cursor-wait opacity-90" : "cursor-pointer"}
					`}
					onClick={hasCoin ? handleRemoveCoin : handleSaveCoin}
					disabled={isLoading || isAnimating}
				>
					{/* Efecto de brillo más rápido */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
						initial={{ x: "-100%" }}
						whileHover={{ x: "100%" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					/>

					{/* Contenido del botón */}
					<span className="relative flex items-center justify-center gap-2">
						{/* Icono animado */}
						<motion.span
							className="text-base sm:text-lg"
							animate={
								isAnimating
									? {
											rotate: [0, -15, 15, 0],
											scale: [1, 1.2, 1],
									  }
									: {}
							}
							transition={{ duration: 0.4, repeat: isAnimating ? 2 : 0 }}
						>
							{isLoading || isAnimating ? (
								<motion.div
									className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
									animate={{ rotate: 360 }}
									transition={{
										duration: 0.8,
										repeat: Infinity,
										ease: "linear",
									}}
								/>
							) : hasCoin ? (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 500, damping: 25 }}
								>
									🏆
								</motion.span>
							) : (
								<motion.span
									whileHover={{ scale: 1.2, rotate: 10 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									💎
								</motion.span>
							)}
						</motion.span>

						{/* Texto animado */}
						<motion.span
							className="font-medium"
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.2 }}
						>
							{isLoading || isAnimating
								? "Guardando..."
								: hasCoin
								? "¡En mi tesoro!"
								: "Conseguir"}
						</motion.span>
					</span>
				</Button>
			</motion.div>
		</div>
	);
}
