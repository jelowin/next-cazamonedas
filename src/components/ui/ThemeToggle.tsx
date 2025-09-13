"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function ThemeToggle() {
	const { theme, setTheme, actualTheme } = useTheme();

	const themes = [
		{
			name: "light",
			label: "Claro",
			icon: Sun,
			description: "Tema claro siempre",
		},
		{
			name: "dark",
			label: "Oscuro",
			icon: Moon,
			description: "Tema oscuro siempre",
		},
		{
			name: "system",
			label: "Sistema",
			icon: Monitor,
			description: "Usar preferencia del sistema",
		},
	] as const;

	const currentIcon = actualTheme === "dark" ? Moon : Sun;
	const CurrentIcon = currentIcon;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="font-inter h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
				>
					<CurrentIcon className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-colors" />
					<span className="sr-only">Cambiar tema</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="font-inter w-48 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
				align="end"
			>
				<div className="space-y-1">
					{themes.map((themeOption) => {
						const Icon = themeOption.icon;
						const isSelected = theme === themeOption.name;

						return (
							<button
								key={themeOption.name}
								onClick={() => setTheme(themeOption.name)}
								className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
									isSelected
										? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
										: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
								}`}
							>
								<Icon className="h-4 w-4" />
								<div className="flex-1 text-left">
									<div className="font-medium">{themeOption.label}</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{themeOption.description}
									</div>
								</div>
								{isSelected && (
									<div className="w-2 h-2 bg-blue-500 rounded-full" />
								)}
							</button>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
}
