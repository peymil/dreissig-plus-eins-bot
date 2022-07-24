import fs from "fs/promises";

export default async () => {
  const file = await fs.readFile("data/config.json", "utf8");
  return JSON.parse(file);
}