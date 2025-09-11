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
				<Button variant="ghost" size="sm" className="hidden md:flex">
					<BarChart3 className="h-4 w-4 mr-2" />
					Estadísticas
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80" align="end">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="font-medium leading-none">Tu Progreso</h4>
						<Link href="/stats" onClick={() => setOpen(false)}>
							<Button variant="outline" size="sm">
								Ver detalle
							</Button>
						</Link>
					</div>

					<StatsDisplay />

					<div className="pt-2 border-t">
						<Link href="/stats" onClick={() => setOpen(false)}>
							<Button variant="secondary" size="sm" className="w-full">
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
