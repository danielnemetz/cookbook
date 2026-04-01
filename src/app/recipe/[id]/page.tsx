import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllRecipes, getRecipeById } from "@/lib/recipes";
import { CategoryBadge } from "@/components/CategoryBadge";
import { IngredientList } from "@/components/IngredientList";
import { InstructionSteps } from "@/components/InstructionSteps";

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const recipe = getRecipeById(id);
    return {
      title: recipe ? `${recipe.title} – Kochbuch` : "Rezept nicht gefunden",
      description: recipe?.description || undefined,
    };
  });
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const difficultyStars: Record<string, number> = {
    einfach: 1,
    normal: 2,
    fortgeschritten: 3,
  };
  const stars = recipe.difficulty
    ? difficultyStars[recipe.difficulty] || 0
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Alle Rezepte
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <CategoryBadge category={recipe.category} />
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-background text-muted border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {recipe.title}
        </h1>

        {recipe.description && (
          <p className="text-lg text-muted">{recipe.description}</p>
        )}
      </div>

      {/* Meta info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {recipe.times?.total && (
          <MetaCard label="Gesamtzeit" value={recipe.times.total} icon="⏱️" />
        )}
        {recipe.times?.preparation && (
          <MetaCard label="Vorbereitung" value={recipe.times.preparation} icon="🔪" />
        )}
        {recipe.times?.cooking && (
          <MetaCard label="Koch-/Backzeit" value={recipe.times.cooking} icon="🔥" />
        )}
        {recipe.times?.resting && (
          <MetaCard label="Ruhezeit" value={recipe.times.resting} icon="💤" />
        )}
        {recipe.servings && (
          <MetaCard
            label="Portionen"
            value={`${recipe.servings.amount} ${recipe.servings.unit}`}
            icon="👥"
          />
        )}
        {recipe.difficulty && (
          <MetaCard
            label="Schwierigkeit"
            value={
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((n) => (
                  <span key={n} className={n <= stars ? "text-accent" : "text-border"}>
                    ●
                  </span>
                ))}
                <span className="ml-1">{recipe.difficulty}</span>
              </span>
            }
            icon="📊"
          />
        )}
        {recipe.nutrition?.calories && (
          <MetaCard
            label="Kalorien"
            value={`${recipe.nutrition.calories} kcal${recipe.nutrition.perServing ? " / Portion" : ""}`}
            icon="🔋"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mb-10">
        {/* Ingredients */}
        <div>
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🧾</span> Zutaten
            </h2>
            <div className="bg-card-bg rounded-xl border border-border p-4">
              <IngredientList groups={recipe.ingredients} />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>👨‍🍳</span> Zubereitung
          </h2>
          <InstructionSteps steps={recipe.instructions} />
        </div>
      </div>

      {/* Tips */}
      {recipe.tips.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💡</span> Tipps
          </h2>
          <div className="bg-accent-light/50 rounded-xl border border-accent/20 p-5">
            <ul className="space-y-2">
              {recipe.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-foreground">
                  <span className="text-accent flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Side dishes */}
      {recipe.sideDishes && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span>🍽️</span> Dazu passt
          </h2>
          <p className="text-foreground bg-card-bg rounded-xl border border-border p-4">
            {recipe.sideDishes}
          </p>
        </div>
      )}

      {/* Source */}
      {recipe.source && (
        <div className="text-sm text-muted border-t border-border pt-6 mt-10">
          <span className="font-medium">Quelle:</span> {recipe.source.name}
          {recipe.source.author && ` von ${recipe.source.author}`}
          {recipe.source.url && (
            <>
              {" · "}
              <a
                href={recipe.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Originallink
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MetaCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="bg-card-bg rounded-xl border border-border p-3 text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}
