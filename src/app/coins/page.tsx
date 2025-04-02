import React, { Suspense } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { turso } from "@/lib/turso";
import { Combobox } from "@/components/ui/combobox";

export default async function CoinsPage() {
	const { rows } = await turso.execute("SELECT * FROM coins LIMIT 20");

	return (
		<section className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
			<div className="w-full mb-6">
				<Combobox
					countries={[
						{ label: "España", value: "España" },
						{ label: "Italia", value: "Italia" },
					]}
				/>
			</div>
			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
				{rows.map(({ country, id, imageSrc, reason, year }, index) => (
					<Suspense
						key={id ? id.toString() : ""}
						fallback={<div>Loading...</div>}
					>
						<Card className="rounded-lg shadow-md bg-slate-50 ">
							<CardHeader className="flex-1">
								<div className="flex flex-row items-center justify-between">
									<CardTitle className="text-lg font-bold lg:text-xl">
										{country ? country.toString() : ""}
										<br />
										<span className="font-medium">
											{year ? year.toString() : ""}
										</span>
									</CardTitle>
									<div className="text-4xl lg:text-5xl">
										{getUnicodeFlagIcon("US")}
									</div>
								</div>
							</CardHeader>
							<CardContent className="flex-1">
								<Image
									className="w-full h-auto"
									src={imageSrc ? imageSrc.toString() : ""}
									alt={`Moneda de ${country} año ${year}`}
									width={230}
									height={230}
									priority={index === 0}
								/>
								<p className="my-4 font-normal text-center text-slate-800 text-md">
									{reason ? reason.toString() : ""}
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
