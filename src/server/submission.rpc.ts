import { createServerFn } from "@tanstack/react-start";
import { insertSubmission } from "#/server/submission.service";
import { submitSchema } from "#/server/submit.schema";

export const submitQuiz = createServerFn()
	.validator(submitSchema)
	.handler(({ data }) => insertSubmission(data));
