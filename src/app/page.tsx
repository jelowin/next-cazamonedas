import React from "react";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/HowItWorks";
import Faqs from "@/components/ui/Faqs";
import Section from "@/components/ui/Section";

export default async function Home() {
	return (
		<>
			<Hero />
			<Section id="how-it-works">
				<HowItWorks />
			</Section>
			<Section id="faqs" className="bg-neutral-50">
				<Faqs />
			</Section>
		</>
	);
}
