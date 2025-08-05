"use client";

import { useState } from "react";

interface RecipeFormProps {
  onSubmit: (ingredients: string) => void;
  isLoading: boolean;
}

export default function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSubmit(ingredients.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
          食材を入力してください
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="例：鶏肉、玉ねぎ、人参、じゃがいも"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !ingredients.trim()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "レシピを作成中..." : "レシピを作成"}
      </button>
    </form>
  );
}
