import Link from "next/link";
import { Recipe } from "@/lib/types";
import { CategoryBadge } from "./CategoryBadge";

const categoryIcons: Record<string, string> = {
  Hauptgericht: "🍽️",
  Salat: "🥗",
  "Kuchen/Torte": "🎂",
  Babybrei: "🍼",
  Eintopf: "🍲",
  Gebäck: "🧇",
  Beilage: "🥔",
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const icon = categoryIcons[recipe.category] || "🍴";
  const ingredientCount = recipe.ingredients.reduce(
    (sum, g) => sum + g.items.length,
    0
  );

  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="group block bg-card-bg rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="text-3xl">{icon}</div>
          <CategoryBadge category={recipe.category} />
        </div>

        <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-tight mb-1.5">
          {recipe.title}
        </h2>

        {recipe.description && (
          <p className="text-sm text-muted line-clamp-2 mb-3">
            {recipe.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-background text-muted border border-border"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-muted">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted pt-3 border-t border-border">
          {recipe.times?.total && (
            <span className="flex items-center gap-1">
              <ClockIcon />
              {recipe.times.total}
            </span>
          )}
          {recipe.difficulty && (
            <span className="flex items-center gap-1">
              <DifficultyIcon />
              {recipe.difficulty}
            </span>
          )}
          <span className="flex items-center gap-1">
            <IngredientIcon />
            {ingredientCount} Zutaten
          </span>
        </div>
      </div>
    </Link>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function IngredientIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}
