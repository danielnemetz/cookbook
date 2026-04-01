export interface IngredientItem {
  amount: number | null;
  unit: string | null;
  name: string;
}

export interface IngredientGroup {
  group: string | null;
  items: IngredientItem[];
}

export interface Servings {
  amount: number;
  unit: string;
}

export interface Times {
  preparation: string | null;
  cooking: string | null;
  resting: string | null;
  total: string | null;
}

export interface Nutrition {
  calories: number | null;
  perServing: boolean;
}

export interface Source {
  type: string;
  name: string;
  author: string | null;
  url: string | null;
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  servings: Servings | null;
  difficulty: string | null;
  times: Times | null;
  ingredients: IngredientGroup[];
  instructions: string[];
  tips: string[];
  sideDishes: string | null;
  nutrition: Nutrition | null;
  source: Source | null;
  originalFile: string;
}
