"use client";

import React from "react";
import { useCountryStats } from "@/contexts/StatsContext";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StatsPage() {
	const { countryStats, loading } = useCountryStats();

	if (loading) {
		return (
			<div className="min-h-screen bg-background">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
						<div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<Card key={i} className="animate-pulse">
								<CardHeader>
									<div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="h-4 bg-gray-200 rounded"></div>
										<div className="h-4 bg-gray-200 rounded"></div>
										<div className="h-2 bg-gray-200 rounded"></div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center gap-4 mb-4">
						<Link href="/coins">
							<Button variant="outline" size="sm">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Volver
							</Button>
						</Link>
					</div>

					<div className="flex items-center gap-3 mb-2">
						<BarChart3 className="h-8 w-8 text-blue-600" />
						<h1 className="text-3xl font-bold">Estadísticas por País</h1>
					</div>
					<p className="text-muted-foreground">
						Resumen de tu progreso de colección por país
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{countryStats.map((stat) => (
						<Card
							key={stat.country}
							className="hover:shadow-md transition-shadow"
						>
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="flex items-center gap-2 text-lg">
										<Globe className="h-5 w-5 text-blue-600" />
										{stat.country}
									</CardTitle>
									<Badge
										variant={stat.percentage === 100 ? "default" : "secondary"}
										className={
											stat.percentage === 100
												? "bg-green-100 text-green-800"
												: ""
										}
									>
										{stat.percentage}%
									</Badge>
								</div>
								<CardDescription>
									{stat.userCoins} de {stat.totalCoins} monedas obtenidas
								</CardDescription>
							</CardHeader>

							<CardContent>
								<div className="space-y-3">
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Tus monedas:</span>
										<span className="font-medium text-blue-600">
											{stat.userCoins}
										</span>
									</div>

									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">
											Total disponibles:
										</span>
										<span className="font-medium">{stat.totalCoins}</span>
									</div>

									<div className="space-y-1">
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className={`h-2 rounded-full transition-all duration-300 ${
													stat.percentage === 100
														? "bg-green-500"
														: stat.percentage >= 75
														? "bg-blue-500"
														: stat.percentage >= 50
														? "bg-yellow-500"
														: "bg-red-400"
												}`}
												style={{ width: `${stat.percentage}%` }}
											></div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{countryStats.length === 0 && (
					<div className="text-center py-12">
						<Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-lg font-medium mb-2">
							No hay datos disponibles
						</h3>
						<p className="text-muted-foreground">
							Comienza a coleccionar monedas para ver tus estadísticas por país.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
