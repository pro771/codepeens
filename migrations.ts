import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// For migrations
const migrationClient = postgres(process.env.DATABASE_URL || "", { max: 1 });
const db = drizzle(migrationClient);

// This will automatically run needed migrations on the database
async function runMigrations() {
  console.log("Running migrations...");
  
  try {
    await db.execute(/* sql */ `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        html TEXT NOT NULL DEFAULT '',
        css TEXT NOT NULL DEFAULT '',
        javascript TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await migrationClient.end();
  }
}

// Export the migration function
export { runMigrations };