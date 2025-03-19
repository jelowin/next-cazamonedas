import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { turso } from "@/lib/turso";

// interface Coin {
// 	id: string;
// 	country: string;
// 	description: string;
// 	imageSrc: string;
// 	reason: string;
// 	year: number;
// }

export default async function CoinsPage() {
	const { rows } = await turso.execute("SELECT * FROM coins LIMIT 20");

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{rows.map(({ country, id, imageSrc, year }) => (
				<Card key={id ? id.toString() : ""}>
					<CardHeader>
						<CardTitle>{country ? country.toString() : ""}</CardTitle>
						<CardDescription>{year ? year.toString() : ""}</CardDescription>
					</CardHeader>
					<CardContent className="m-auto">
						<Image
							src={imageSrc ? imageSrc.toString() : ""}
							alt={`Moneda de ${country} año ${year}`}
							width={200}
							height={38}
						/>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Guardar</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
