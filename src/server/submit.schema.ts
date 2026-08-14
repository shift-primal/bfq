import z from "zod";

export const submitSchema = z.object({
	name: z.string().trim().min(3, "Name must be at least 3 characters.").max(30),
	answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
});
