"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Recipe } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes: Recipe[];
  categories: string[];
}

export function SearchAndFilter({ recipes, categories }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(recipes, {
        keys: [
          { name: "title", weight: 3 },
          { name: "description", weight: 1.5 },
          { name: "tags", weight: 2 },
          { name: "ingredients.items.name", weight: 1.5 },
          { name: "category", weight: 1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [recipes]
  );

  const filtered = useMemo(() => {
    let result = recipes;

    if (query.trim()) {
      result = fuse.search(query).map((r) => r.item);
    }

    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory);
    }

    return result;
  }, [query, selectedCategory, recipes, fuse]);

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <SearchIcon />
          <input
            type="text"
            placeholder="Rezept suchen... (z.B. Lasagne, Lachs, Vegetarisch)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card-bg text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
              selectedCategory === null
                ? "bg-accent text-white border-accent"
                : "bg-card-bg text-muted border-border hover:border-accent/40"
            }`}
          >
            Alle ({recipes.length})
          </button>
          {categories.map((cat) => {
            const count = recipes.filter((r) => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
                className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "bg-card-bg text-muted border-border hover:border-accent/40"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-muted text-lg">Kein Rezept gefunden</p>
          <p className="text-muted/60 text-sm mt-1">
            Versuche einen anderen Suchbegriff
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
