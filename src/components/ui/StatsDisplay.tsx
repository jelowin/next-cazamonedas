"use client";

import React from "react";
import { useStats } from "@/hooks/useStats";
import { Coins } from "lucide-react";

interface StatsDisplayProps {
	className?: string;
}

export default function StatsDisplay({ className = "" }: StatsDisplayProps) {
	const { stats, loading } = useStats();

	if (loading) {
		return (
			<div className={`animate-pulse space-y-2 ${className}`}>
				<div className="h-4 bg-gray-200 rounded w-3/4"></div>
				<div className="h-3 bg-gray-200 rounded w-1/2"></div>
			</div>
		);
	}

	if (!stats) {
		return null;
	}

	return (
		<div className={`space-y-3 ${className}`}>
			<div className="flex items-center gap-2 text-sm">
				<Coins className="h-4 w-4 text-blue-600" />
				<span className="font-medium">Tu Colección</span>
			</div>

			<div className="space-y-2">
				<div className="flex justify-between items-center text-sm">
					<span className="text-muted-foreground">Monedas obtenidas:</span>
					<span className="font-medium">{stats.userCoins}</span>
				</div>

				<div className="flex justify-between items-center text-sm">
					<span className="text-muted-foreground">Total disponibles:</span>
					<span className="font-medium">{stats.totalCoins}</span>
				</div>

				<div className="space-y-1">
					<div className="flex justify-between items-center text-sm">
						<span className="text-muted-foreground">Progreso:</span>
						<span className="font-medium text-blue-600">
							{stats.percentage}%
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${stats.percentage}%` }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}
