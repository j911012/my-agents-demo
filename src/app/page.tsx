"use client";

import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import RecipeDisplay from "@/components/RecipeDisplay";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (ingredients: string) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("レシピの作成に失敗しました");
      }

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            レシピ作成アシスタント
          </h1>
          <p className="text-gray-600">
            食材を入力して、栄養バランスの良いレシピを作成しましょう
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <RecipeForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">レシピを作成中...</p>
          </div>
        )}

        <RecipeDisplay recipe={recipe} />
      </div>
    </div>
  );
}
