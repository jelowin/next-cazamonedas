"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { BarChart3 } from "lucide-react";
import StatsDisplay from "@/components/ui/StatsDisplay";
import Link from "next/link";

export default function StatsPopover() {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);

	if (!session) {
		return null;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="font-inter hidden md:flex group relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 hover:shadow-md hover:shadow-purple-200/50 dark:hover:shadow-purple-800/25 hover:scale-105 font-semibold"
				>
					<BarChart3 className="h-4 w-4 mr-2 text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300" />
					<span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300 font-semibold">
						Estadísticas
					</span>
					{/* Efecto de brillo sutil */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-lg" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="font-inter w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
				align="end"
			>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="font-poppins font-semibold leading-none text-gray-900 dark:text-gray-100">
							Tu Progreso
						</h4>
						<Link href="/stats" onClick={() => setOpen(false)}>
							<Button
								variant="outline"
								size="sm"
								className="font-inter border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
							>
								Ver detalle
							</Button>
						</Link>
					</div>

					<StatsDisplay />

					<div className="pt-2 border-t border-gray-200 dark:border-gray-600">
						<Link href="/stats" onClick={() => setOpen(false)}>
							<Button
								variant="secondary"
								size="sm"
								className="font-inter w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
							>
								<BarChart3 className="h-4 w-4 mr-2" />
								Ver estadísticas por país
							</Button>
						</Link>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
