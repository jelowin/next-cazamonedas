import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { getCountryCodes } from "@/lib/countryCodeService";

import { Combobox } from "@/components/ui/combobox";
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

interface CoinsPageProps {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}

export default async function CoinsPage(props: CoinsPageProps) {
	const urlSearchParams = new URLSearchParams();
	const searchParams = await props.searchParams;

	if (searchParams) {
		Object.entries(searchParams).forEach(([key, value]) => {
			if (value) urlSearchParams.append(key, value.toString());
		});
	}

	const urlParams = urlSearchParams.toString();

	// Detectar automáticamente la URL base para desarrollo/producción
	const baseUrl =
		process.env.NEXT_PUBLIC_APP_URL ||
		(process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://next-cazamonedas.vercel.app");

	const coinsUrl = `${baseUrl}/api/get-coins${
		urlParams ? `?${urlParams}` : ""
	}`;

	const userCoinsUrl = `${baseUrl}/api/get-user-coins`;

	console.log("🌐 URLs generadas:", { baseUrl, coinsUrl, userCoinsUrl });

	// Obtener las cookies del servidor para pasarlas al fetch
	const cookieStore = await cookies();

	// Obtener códigos de país directamente desde el servicio (con cache)
	const countryCodeMap = await getCountryCodes();

	const coinsResponse = await fetch(coinsUrl, {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	const userCoinsResponse = await fetch(userCoinsUrl, {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	if (!coinsResponse.ok) {
		const text = await coinsResponse.text();
		console.error("Error del servidor:", text);
		throw new Error("Error al obtener las monedas");
	}

	const coinsData: {
		coins: Coin[];
		countries: { label: string; value: string }[];
		years: { label: string; value: string }[];
	} = await coinsResponse.json();

	// Manejo seguro para obtener userCoins (puede fallar si no está autenticado)
	let userCoinsData: {
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
	} = { success: false, data: [] };

	try {
		if (userCoinsResponse.ok) {
			userCoinsData = await userCoinsResponse.json();
		} else {
			const text = await userCoinsResponse.text();
			console.error("Error del servidor (userCoins):", {
				status: userCoinsResponse.status,
				statusText: userCoinsResponse.statusText,
				body: text,
				url: userCoinsUrl,
				headers: Object.fromEntries(userCoinsResponse.headers.entries()),
			});

			// Si el error es de autenticación, usar datos vacíos en lugar de fallar
			if (userCoinsResponse.status === 401) {
				console.warn(
					"🔒 Usuario no autenticado, mostrando vista sin datos de usuario"
				);
				userCoinsData = { success: false, data: [] };
			} else {
				throw new Error("Error al obtener las monedas del usuario");
			}
		}
	} catch (error) {
		console.error("❌ Error procesando userCoins:", error);
		userCoinsData = { success: false, data: [] };
	}

	console.log("PEPE", { coinsData, userCoinsData, countryCodeMap });

	return (
		<section className="px-4 py-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
			<div className="flex w-full gap-4 mb-6">
				<Combobox
					data={coinsData.countries}
					param="country"
					placeholder="Selecciona un país"
				/>
				<Combobox
					data={coinsData.years}
					param="year"
					placeholder="Selecciona un año"
				/>
			</div>
			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
				{coinsData.coins.map(
					({ country, id, imageSrc, reason, year }, index) => (
						<Suspense key={id} fallback={<div>Loading...</div>}>
							<Card data-id={id} className="rounded-lg shadow-md bg-slate-50 ">
								<CardHeader className="flex-1">
									<div className="flex flex-row items-center justify-between">
										<CardTitle className="text-lg font-bold lg:text-xl">
											{country}
											<br />
											<span className="font-medium">{year}</span>
										</CardTitle>
										<CountryFlag
											country={country}
											countryCodeMap={countryCodeMap}
											className="text-4xl lg:text-5xl"
										/>
									</div>
								</CardHeader>
								<CardContent className="flex-1">
									<Image
										className="w-full h-auto"
										src={imageSrc}
										alt={`Moneda de ${country} año ${year}`}
										width={230}
										height={230}
										priority={index === 0}
									/>
									<p className="my-4 font-normal text-center text-slate-800 text-md">
										{reason}
									</p>
								</CardContent>
								<SaveButton coinId={id} userCoinsData={userCoinsData} />
							</Card>
						</Suspense>
					)
				)}
			</div>
		</section>
	);
}
