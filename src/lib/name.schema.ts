import { z } from "zod";

export const nameSchema = z
	.string()
	.trim()
	.min(3, "Navnet ditt må minst inneholde 2 karakterer")
	.max(30, "Navnet ditt kan ikke overstige 30 karakterer");
