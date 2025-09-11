"use client";

import React, { ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface NuqsProviderProps {
	children: ReactNode;
}

export default function NuqsProvider({ children }: NuqsProviderProps) {
	return <NuqsAdapter>{children}</NuqsAdapter>;
}
