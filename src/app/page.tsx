import { Button } from "@/components/ui/button";
import Image from "next/image";
import { turso } from "@/lib/turso";

interface Coin {
	id: string;
	country: string;
	description: string;
	imageSrc: string;
	reason: string;
	year: number;
}

export default async function Home() {
	const { rows } = await turso.execute("SELECT * FROM coins LIMIT 1");

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={180}
					height={38}
					priority
				/>
				{rows.map(({ country }, index) => (
					<div key={index}>
						{country ? country.toString() : ""}
						<Button>Click me</Button>
					</div>
				))}
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	);
}
