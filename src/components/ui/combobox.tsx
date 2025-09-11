"use client";

import * as React from "react";
import { useQueryState } from "nuqs";

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

	// Usar nuqs para manejar el query parameter de manera declarativa
	const [value, setValue] = useQueryState(paramProp, {
		defaultValue: "",
		clearOnDefault: true, // Remueve el param de la URL cuando está vacío
	});

	const handleSelectValueChange = (selectedValue: string) => {
		// Si es el mismo valor, lo deseleccionamos (toggle)
		const newValue = selectedValue === value ? "" : selectedValue;

		// nuqs maneja automáticamente la URL y el estado
		setValue(newValue);
		setOpen(false);
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
						<CommandEmpty>No se encontraron resultados.</CommandEmpty>
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
