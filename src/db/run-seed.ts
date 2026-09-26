import "dotenv/config";
import { seedDatabase } from "./seed";

async function main() {
  console.log("Starting seed runner...");
  await seedDatabase();
  console.log("Finished seed runner!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
