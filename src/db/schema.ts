import {
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull().unique("submissions_name_unique"),
	score: integer().notNull(),
	answers: jsonb().notNull(),
	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
