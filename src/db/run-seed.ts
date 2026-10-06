import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const { seedDatabase } = await import("./seed");

  console.log("Starting seed runner...");
  await seedDatabase();
  console.log("Finished seed runner!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});