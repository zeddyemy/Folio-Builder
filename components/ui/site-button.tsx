// components/ui/site-button.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Get the button props using ComponentProps
type ButtonProps = React.ComponentProps<typeof Button>;

export const SiteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={cn(
					"site-btn cursor-pointer", // Your custom classes
					className // Preserves existing classNames
				)}
				{...props}
			/>
		);
	}
);
