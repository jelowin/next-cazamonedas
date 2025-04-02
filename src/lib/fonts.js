import { Raleway, Montserrat } from "next/font/google";

export const raleway = Raleway({
	subsets: ["latin"], // Define los subsets que necesitas (latin es común para idiomas occidentales)
	weight: ["400", "700"], // Pesos que quieres usar (regular y bold, por ejemplo)
	style: ["normal", "italic"],
	display: "swap", // Mejora la carga de la fuente
});

export const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal"],
	display: "swap",
});
