import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.ts";

// biome-ignore lint/style/noNonNullAssertion: its there
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql, schema });
export type DB = typeof db;
