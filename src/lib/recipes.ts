import fs from "fs";
import path from "path";
import { Recipe } from "./types";

const recipesDir = path.join(process.cwd(), "data", "recipes");

function loadRecipes(): Recipe[] {
  const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(recipesDir, file), "utf-8");
    return JSON.parse(raw) as Recipe;
  });
}

let cached: Recipe[] | null = null;

function getAll(): Recipe[] {
  if (!cached) cached = loadRecipes();
  return cached;
}

export function getAllRecipes(): Recipe[] {
  return getAll().sort((a, b) => a.title.localeCompare(b.title, "de"));
}

export function getRecipeById(id: string): Recipe | undefined {
  return getAll().find((r) => r.id === id);
}

export function getAllCategories(): string[] {
  const cats = new Set(getAll().map((r) => r.category));
  return Array.from(cats).sort((a, b) => a.localeCompare(b, "de"));
}

export function getAllTags(): string[] {
  const tags = new Set(getAll().flatMap((r) => r.tags));
  return Array.from(tags).sort((a, b) => a.localeCompare(b, "de"));
}
