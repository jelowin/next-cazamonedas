"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import CountryFlag from "@/components/ui/CountryFlag";
import SaveButton from "@/components/ui/SaveButton";
import CoinImageDialog from "@/components/ui/CoinImageDialog";

interface Coin {
	id: number;
	country: string;
	year: string;
	imageSrc: string;
	reason: string;
}

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

interface CoinsListProps {
	coins: Coin[];
	userCoinsData: UserCoinsData;
	countryCodeMap: Record<string, string>;
}

export default function CoinsList({
	coins,
	userCoinsData,
	countryCodeMap,
}: CoinsListProps) {
	// Estado para el dialog de zoom de imagen
	const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Estado local para las monedas del usuario que se sincroniza con los cambios
	const [localUserCoins, setLocalUserCoins] = useState(
		userCoinsData?.data || []
	);

	// Helper function para verificar si una moneda está guardada usando el estado local
	const isCoinSaved = (coinId: number): boolean => {
		return localUserCoins.some((savedCoin) => savedCoin.coin_id === coinId);
	};

	// Función para manejar cambios desde SaveButton
	const handleUserCoinsChange = (
		newUserCoins: Array<{ coin_id: number; user_id: string }>
	) => {
		setLocalUserCoins(newUserCoins);
	};

	// Función para abrir el dialog con zoom
	const handleImageClick = (coin: Coin) => {
		setSelectedCoin(coin);
		setIsDialogOpen(true);
	};

	// Función para cerrar el dialog
	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setSelectedCoin(null);
	};

	if (coins.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
					No se encontraron monedas
				</p>
				<p className="text-sm text-gray-500 dark:text-gray-500">
					Intenta ajustar los filtros para ver más resultados
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid gap-5 sm:gap-7 lg:gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-1">
				{coins.map(({ country, id, imageSrc, reason, year }, index) => {
					const isOwned = isCoinSaved(id);

					return (
						<Card
							key={id}
							data-id={id}
							className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out backdrop-blur-sm h-full flex flex-col transform hover:-translate-y-2 hover:scale-[1.03] ${
								isOwned
									? "bg-gradient-to-br from-yellow-50 to-amber-50/90 dark:from-yellow-900/40 dark:to-amber-900/40 ring-2 ring-yellow-400/70 dark:ring-yellow-500/70 shadow-xl shadow-yellow-400/40 dark:shadow-yellow-500/40 border border-yellow-300/60 dark:border-yellow-600/60"
									: "bg-gradient-to-br from-white to-gray-50/70 dark:from-gray-800/95 dark:to-gray-900/80 border border-gray-200/80 dark:border-gray-700/80 shadow-gray-300/40 dark:shadow-gray-900/40"
							}`}
						>
							{/* Insignia dorada para monedas guardadas */}
							{isOwned && (
								<div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600 text-white rounded-full p-1.5 shadow-lg shadow-yellow-400/40 dark:shadow-yellow-500/40 animate-pulse">
									<svg
										className="w-3 h-3 sm:w-4 sm:h-4"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 2L13 8h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							)}
							{/* Micro-interacción: Sutil efecto de brillo que se mueve */}
							<div
								className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out ${
									isOwned
										? "bg-gradient-to-r from-transparent via-yellow-300/40 dark:via-yellow-400/30 to-transparent"
										: "bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent"
								}`}
							/>
							{/* Borde de enfoque mejorado */}
							<div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-blue-400/30 dark:group-hover:ring-blue-500/40 transition-all duration-300" />
							{/* Efecto neomorphic sutil en el header */}
							<CardHeader className="relative px-4 sm:px-5 pt-4 sm:pt-5 pb-3 bg-gradient-to-b from-white/30 dark:from-gray-800/30 to-transparent">
								<div className="flex flex-row items-start justify-between">
									<CardTitle className="text-sm font-bold lg:text-base text-gray-800 dark:text-gray-200 leading-tight">
										{country}
										<br />
										<span className="text-xs font-normal text-gray-600 dark:text-gray-400">
											{year}
										</span>
									</CardTitle>

									{/* Bandera con efectos sutiles */}
									<div className="relative group/flag">
										{/* Sutil shadow neomorphic para la bandera */}
										<div className="absolute inset-0 bg-white/50 dark:bg-gray-700/50 rounded-full blur-sm scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<CountryFlag
											country={country}
											countryCodeMap={countryCodeMap}
											className="relative text-2xl sm:text-3xl lg:text-4xl transform group-hover:scale-110 transition-transform duration-300"
										/>
									</div>
								</div>
							</CardHeader>{" "}
							<CardContent className="px-4 sm:px-5 pb-4 sm:pb-5 flex-1 flex flex-col justify-between">
								{/* Container de imagen con efectos modernos y marco dorado para monedas guardadas */}
								<div
									className={`relative max-w-[120px] sm:max-w-[160px] mx-auto mb-3 transition-all duration-500 cursor-pointer ${
										isOwned ? "p-1" : ""
									}`}
									onClick={() =>
										handleImageClick({ country, id, imageSrc, reason, year })
									}
								>
									{/* Marco dorado para monedas guardadas */}
									{isOwned && (
										<div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 dark:from-yellow-500 dark:via-amber-600 dark:to-yellow-700 rounded-xl p-0.5 shadow-lg shadow-yellow-400/30 dark:shadow-yellow-500/40">
											<div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 dark:from-yellow-400 dark:via-amber-500 dark:to-yellow-600 rounded-xl blur-sm opacity-60 animate-pulse" />
										</div>
									)}

									{/* Fondo que coincide con el color de la card */}
									<div
										className={`absolute inset-0 rounded-xl ${
											isOwned
												? "bg-gradient-to-br from-yellow-50 to-amber-50 inset-1"
												: "bg-gradient-to-br from-white to-gray-50/30"
										}`}
									/>

									{/* Overlay de zoom en hover */}
									<div className="absolute inset-0 bg-black/0 hover:bg-black/10 rounded-xl transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
										<div className="bg-white/90 rounded-full p-2 transform scale-75 hover:scale-100 transition-transform duration-200">
											<svg
												className="w-4 h-4 text-gray-700"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
												/>
											</svg>
										</div>
									</div>

									<Image
										className="relative w-full h-auto rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
										src={imageSrc}
										alt={`Moneda de ${country} año ${year}`}
										width={180}
										height={180}
										priority={index === 0}
										placeholder="blur"
										blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmOGZhZmMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMCAwaDE4MHYxODBIMHoiLz48L3N2Zz4="
									/>
								</div>

								{/* Texto con mejor tipografía y spacing - ocupa el espacio restante */}
								<div className="flex-1 flex items-center justify-center mb-4">
									<p className="text-xs sm:text-sm font-normal text-center text-gray-700 dark:text-gray-300 leading-relaxed px-1 line-clamp-3 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
										{reason}
									</p>
								</div>
							</CardContent>
							{/* Botón con efectos modernos - siempre en la parte inferior */}
							<div className="px-3 sm:px-4 pb-3 sm:pb-4 mt-auto">
								<SaveButton
									coinId={id}
									userCoinsData={{ ...userCoinsData, data: localUserCoins }}
									onUserCoinsChange={handleUserCoinsChange}
								/>
							</div>
						</Card>
					);
				})}
			</div>

			{/* Dialog de zoom para la imagen */}
			{selectedCoin && (
				<CoinImageDialog
					isOpen={isDialogOpen}
					onClose={handleCloseDialog}
					imageSrc={selectedCoin.imageSrc}
					country={selectedCoin.country}
					year={selectedCoin.year}
					reason={selectedCoin.reason}
				/>
			)}
		</>
	);
}
