"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("system");
	const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		// Cargar tema guardado del localStorage
		const savedTheme = localStorage.getItem("cazamonedas-theme") as Theme;
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;

		let resolvedTheme: "light" | "dark";

		if (theme === "system") {
			resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		} else {
			resolvedTheme = theme;
		}

		setActualTheme(resolvedTheme);

		// Remover clases anteriores
		root.classList.remove("light", "dark");

		// Añadir la clase del tema actual
		root.classList.add(resolvedTheme);

		// Guardar en localStorage
		localStorage.setItem("cazamonedas-theme", theme);
	}, [theme]);

	// Escuchar cambios en la preferencia del sistema
	useEffect(() => {
		if (theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			setActualTheme(mediaQuery.matches ? "dark" : "light");
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
