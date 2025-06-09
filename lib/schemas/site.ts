import { z } from "zod";

export const createSiteSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
	description: z.string().max(200, "Description must be less than 200 characters").optional(),
	category: z.enum(["personal", "business", "portfolio", "blog"], {
		required_error: "Please select a category",
	}),
});

export type CreateSiteFormData = z.infer<typeof createSiteSchema>; 