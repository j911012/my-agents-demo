import { Agent, tool } from "@openai/agents";
import { z } from "zod";

// レシピ提案ツール
const suggestRecipe = tool({
  name: "suggest_recipe",
  description: "食材からレシピを提案します",
  parameters: z.object({
    ingredients: z.array(z.string()).describe("利用可能な食材のリスト"),
  }),
  execute: async ({ ingredients }) => {
    // シミュレーション用のレシピデータ
    const recipes = {
      "鶏肉,玉ねぎ,にんじん": "鶏肉と野菜の炒め物",
      "卵,ご飯,ケチャップ": "オムライス",
      "豆腐,わかめ,味噌": "味噌汁",
      "豚肉,キャベツ,塩": "豚肉とキャベツの炒め物",
    };

    const key = ingredients.join(",");
    return recipes[key as keyof typeof recipes];
  },
});

// レシピ作成エージェント
export const recipeCreationAgent = new Agent({
  name: "Recipe Creation Agent",
  instructions: `
    あなたはレシピ作成の専門家です。
    
    ユーザーから提供された食材を分析し、suggest_recipeツールを使用して
    適切なレシピを提案してください。
    
    レシピの提案が完了したら、栄養計算エージェントに引き継いでください。
    
    必ず日本語で返答してください。
  `,
  tools: [suggestRecipe],
});
