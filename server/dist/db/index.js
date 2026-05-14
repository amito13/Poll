import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
const connectionString = process.env.DATABASE_URL;
const client = postgres(process.env.DATABASE_URL, {
    ssl: "require",
});
export const db = drizzle(client, {
    schema,
});
//# sourceMappingURL=index.js.map