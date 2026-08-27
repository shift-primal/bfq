import { type RefinementCtx, z } from "zod";
import { questions } from "#/config/questions.data";

const addIssue = (ctx: RefinementCtx, id: string, message: string) =>
	ctx.addIssue({ code: "custom", path: ["answers", id], message });

export const submitSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(3, "Name must be at least 3 characters.")
			.max(30),
		answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
	})
	.superRefine((data, ctx) => {
		for (const [id, answer] of Object.entries(data.answers)) {
			const question = questions.find((q) => q.id === id);

			if (!question) {
				addIssue(ctx, id, "Unknown question id.");

				continue;
			}

			const expectsArray = question.type !== "select";

			if (Array.isArray(answer) !== expectsArray) {
				addIssue(
					ctx,
					id,
					expectsArray
						? "Question type expects an Array of answers, but received string"
						: "Question type expects a string as answer, but received an Array",
				);

				continue;
			}

			const validSet =
				question.type === "order" ? question.correctOrder : question.options;

			const values = Array.isArray(answer) ? answer : [answer];

			const invalid = values.filter((v) => !validSet.includes(v));

			if (
				question.type === "order" &&
				(values.length !== question.correctOrder.length ||
					new Set(values).size !== values.length)
			) {
				addIssue(
					ctx,
					id,
					`Answer for question ${id} must include every option exactly once.`,
				);
				continue;
			}

			if (invalid.length > 0) {
				addIssue(
					ctx,
					id,
					`Invalid value(s) for question ${id}: ${invalid.join(",")}`,
				);
			}
		}
	});
