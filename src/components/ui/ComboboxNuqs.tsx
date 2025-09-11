"use client";

import * as React from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

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

interface ComboboxNuqsProps {
	data: Array<{ label: string; value: string }>;
	param: string;
	placeholder: string;
	onValueChange?: (value: string) => void;
	type?: "string" | "number"; // Nuevo prop para especificar el tipo
}

/**
 * Combobox optimizado con nuqs para manejo automático de query parameters
 */
export function ComboboxNuqs({
	data,
	param,
	placeholder,
	onValueChange,
	type = "string",
}: ComboboxNuqsProps) {
	const [open, setOpen] = React.useState(false);

	// Hooks separados para diferentes tipos
	const [stringValue, setStringValue] = useQueryState(
		param,
		parseAsString.withDefault("").withOptions({ clearOnDefault: true })
	);

	const [numberValue, setNumberValue] = useQueryState(
		param,
		parseAsInteger.withOptions({ clearOnDefault: true })
	);

	// Usar el valor correcto según el tipo
	const value = type === "number" ? numberValue : stringValue;

	const handleSelectValueChange = React.useCallback(
		async (selectedValue: string) => {
			// Si es el mismo valor, lo deseleccionamos (toggle)
			const currentValue = type === "number" ? value?.toString() : value;
			const shouldClear = selectedValue === currentValue;

			if (type === "number") {
				const newValue = shouldClear ? null : parseInt(selectedValue) || null;
				await setNumberValue(newValue);
			} else {
				const newValue = shouldClear ? "" : selectedValue;
				await setStringValue(newValue);
			}

			setOpen(false);

			// Callback opcional para lógica adicional
			onValueChange?.(shouldClear ? "" : selectedValue);
		},
		[value, setNumberValue, setStringValue, onValueChange, type]
	);

	// Encontrar el item seleccionado
	const currentValueStr =
		type === "number" ? value?.toString() || "" : value || "";
	const selectedItem = data.find((item) => item.value === currentValueStr);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full sm:w-[200px] justify-between text-md"
				>
					{selectedItem?.label || placeholder}
					<ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full sm:w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder={`Buscar ${placeholder.toLowerCase()}...`}
					/>
					<CommandList>
						<CommandEmpty>No se encontraron resultados.</CommandEmpty>
						<CommandGroup>
							{data.map((item) => (
								<CommandItem
									className="text-md"
									key={item.value}
									value={item.value}
									onSelect={handleSelectValueChange}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											currentValueStr === item.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
