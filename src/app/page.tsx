import { getAllRecipes, getAllCategories } from "@/lib/recipes";
import { SearchAndFilter } from "@/components/SearchAndFilter";

export default function Home() {
  const recipes = getAllRecipes();
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Unsere Rezepte
        </h2>
        <p className="text-muted">
          Von handgeschriebenen Familienrezepten bis zu Internetklassikern &ndash; alles an einem Ort.
        </p>
      </div>

      <SearchAndFilter recipes={recipes} categories={categories} />
    </div>
  );
}
