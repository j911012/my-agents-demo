import "dotenv/config";
import { run } from "@openai/agents";
import { recipeCreationAgent } from "@/lib/agents/recipeCreationAgent";

(async () => {
  const result = await run(
    recipeCreationAgent,
    "鶏肉、玉ねぎ、人参、じゃがいもを使ってレシピを提案してください"
  );
  console.log(result.finalOutput);
})();
