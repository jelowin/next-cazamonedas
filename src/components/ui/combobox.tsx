"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Combobox({
	data,
	param: paramProp,
	placeholder,
}: {
	data: Array<{ label: string; value: string }>;
	param: string;
	placeholder: string;
}) {
	const [open, setOpen] = React.useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const [value, setValue] = React.useState(searchParams.get(paramProp) || "");

	const handleSelectValueChange = (selectedValue: string) => {
		const newValue = selectedValue === value ? "" : selectedValue;
		setValue(newValue);
		setOpen(false);

		const params = new URLSearchParams(searchParams);
		if (newValue) {
			params.set(`${paramProp}`, newValue);
		} else {
			params.delete(paramProp);
		}
		router.push(`?${params.toString()}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between text-md"
				>
					{value ? data.find((d) => d.value === value)?.label : placeholder}
					<ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>No se ha encontrado el país.</CommandEmpty>
						<CommandGroup>
							{data.map((d) => (
								<CommandItem
									className="text-md"
									key={d.value}
									value={d.value}
									onSelect={handleSelectValueChange}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === d.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{d.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
