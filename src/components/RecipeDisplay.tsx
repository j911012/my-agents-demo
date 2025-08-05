"use client";

interface RecipeDisplayProps {
  recipe: string | null;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  if (!recipe) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        作成されたレシピ
      </h3>
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap text-sm text-gray-700">
          {recipe}
        </pre>
      </div>
    </div>
  );
}
