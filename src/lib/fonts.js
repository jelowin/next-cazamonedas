import { Inter, Poppins, Outfit } from "next/font/google";

// Inter para navegación, botones y contenido general
export const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600"], // Regular, Medium, SemiBold
	style: ["normal"],
	display: "swap",
	variable: "--font-inter",
});

// Poppins para títulos grandes y elementos destacados
export const poppins = Poppins({
	subsets: ["latin"],
	weight: ["600", "700", "800"], // SemiBold, Bold, ExtraBold
	style: ["normal"],
	display: "swap",
	variable: "--font-poppins",
});

// Outfit para acentos especiales y elementos únicos
export const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
	style: ["normal"],
	display: "swap",
	variable: "--font-outfit",
});
