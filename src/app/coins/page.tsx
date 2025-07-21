import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import Image from "next/image";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

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
	const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/getcoins${
		urlParams ? `?${urlParams}` : ""
	}`;

	const response = await fetch(url, {});

	if (!response.ok) {
		const text = await response.text();
		console.error("Error del servidor:", text);
		throw new Error("Error al obtener las monedas");
	}

	const data: {
		coins: Coin[];
		countries: { label: string; value: string }[];
		years: { label: string; value: string }[];
	} = await response.json();

	return (
		<section className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
			<div className="flex gap-4 w-full mb-6">
				<Combobox
					data={data.countries}
					param="country"
					placeholder="Selecciona un país"
				/>
				<Combobox
					data={data.years}
					param="year"
					placeholder="Selecciona un año"
				/>
			</div>
			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
				{data.coins.map(({ country, id, imageSrc, reason, year }, index) => (
					<Suspense key={id} fallback={<div>Loading...</div>}>
						<Card className="rounded-lg shadow-md bg-slate-50 ">
							<CardHeader className="flex-1">
								<div className="flex flex-row items-center justify-between">
									<CardTitle className="text-lg font-bold lg:text-xl">
										{country}
										<br />
										<span className="font-medium">{year}</span>
									</CardTitle>
									<div className="text-4xl lg:text-5xl">
										{getUnicodeFlagIcon("US")}
									</div>
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
							<CardFooter className="flex-1">
								<Button className="w-full h-12">Guardar</Button>
							</CardFooter>
						</Card>
					</Suspense>
				))}
			</div>
		</section>
	);
}
