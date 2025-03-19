import React from "react";
import clsx from "clsx";

interface SectionProps {
	children: React.ReactNode;
	id?: string;
	className?: string;
}

export default function Section({ children, id, className }: SectionProps) {
	return (
		<section
			id={id}
			className={clsx(
				"border-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 pb-4 lg:pb-12",
				className
			)}
		>
			{children}
		</section>
	);
}
