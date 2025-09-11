"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import CountryFlag from "@/components/ui/CountryFlag";
import SaveButton from "@/components/ui/SaveButton";

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
	if (coins.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-lg text-gray-600 mb-4">No se encontraron monedas</p>
				<p className="text-sm text-gray-500">
					Intenta ajustar los filtros para ver más resultados
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{coins.map(({ country, id, imageSrc, reason, year }, index) => (
				<Card
					key={id}
					data-id={id}
					className="rounded-lg shadow-md bg-slate-50 transition-transform hover:scale-105 py-3 sm:py-6"
				>
					<CardHeader className="flex-1 px-3 sm:px-6">
						<div className="flex flex-row items-center justify-between">
							<CardTitle className="text-base font-bold lg:text-xl">
								{country}
								<br />
								<span className="font-medium text-base">{year}</span>
							</CardTitle>
							<CountryFlag
								country={country}
								countryCodeMap={countryCodeMap}
								className="text-2xl sm:text-4xl lg:text-5xl"
							/>
						</div>
					</CardHeader>
					<CardContent className="flex-1 px-3 sm:px-6">
						<div className="relative max-w-[180px] sm:max-w-none mx-auto">
							<Image
								className="w-full h-auto rounded-md"
								src={imageSrc}
								alt={`Moneda de ${country} año ${year}`}
								width={230}
								height={230}
								priority={index === 0}
								placeholder="blur"
								blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMwIiBoZWlnaHQ9IjIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjZGRkZGRkIiBkPSJNMCAwaDIzMHYyMzBIMHoiLz48L3N2Zz4="
							/>
						</div>
						<p className="my-2 sm:my-4 font-normal text-center text-slate-800 text-base">
							{reason}
						</p>
					</CardContent>
					<SaveButton coinId={id} userCoinsData={userCoinsData} />
				</Card>
			))}
		</div>
	);
}
