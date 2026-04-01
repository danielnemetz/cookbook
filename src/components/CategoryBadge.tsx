const categoryColors: Record<string, string> = {
  Hauptgericht: "bg-blue-50 text-blue-700 border-blue-200",
  Salat: "bg-green-50 text-green-700 border-green-200",
  "Kuchen/Torte": "bg-pink-50 text-pink-700 border-pink-200",
  Babybrei: "bg-purple-50 text-purple-700 border-purple-200",
  Eintopf: "bg-orange-50 text-orange-700 border-orange-200",
  Gebäck: "bg-amber-50 text-amber-700 border-amber-200",
  Beilage: "bg-teal-50 text-teal-700 border-teal-200",
};

export function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${colors}`}>
      {category}
    </span>
  );
}
