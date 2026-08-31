import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import {
	buildSubmissionResult,
	insertSubmission,
} from "#/server/submission.service";
import { submitSchema } from "#/server/submit.schema";

export const submitQuiz = createServerFn()
	.validator(submitSchema)
	.handler(({ data }) => insertSubmission(data));

export const getSubmissionResult = createServerFn()
	.validator(z.string())
	.handler(async ({ data }) => {
		const result = await buildSubmissionResult(data);
		if (!result) throw new Error("Not found");
		return result;
	});
