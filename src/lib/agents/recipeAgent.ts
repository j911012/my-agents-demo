import { Agent, tool } from "@openai/agents";
import { z } from "zod";

// レシピ検索ツール
const searchRecipe = tool({
  name: "search_recipe",
  description: "料理名からレシピを検索します",
  parameters: z.object({
    dish: z.string().describe("レシピを検索したい料理名"),
  }),
  execute: async ({ dish }) => {
    const recipes = {
      カレー:
        "材料: 肉、玉ねぎ、にんじん、じゃがいも、カレールー\n手順: 1. 肉と野菜を炒める 2. 水を加えて煮込む 3. カレールーを溶かす",
      オムライス:
        "材料: 卵、ご飯、ケチャップ、バター\n手順: 1. ご飯をケチャップで炒める 2. 卵を焼く 3. ご飯を包む",
      味噌汁:
        "材料: 味噌、豆腐、わかめ、だし\n手順: 1. だしを取る 2. 具材を入れる 3. 味噌を溶かす",
    };

    return (
      recipes[dish as keyof typeof recipes] ||
      `${dish}のレシピを調べてみましょう。`
    );
  },
});

export const recipeAgent = new Agent({
  name: "Recipe Assistant",
  instructions:
    "あなたは料理の専門家です。レシピの質問に丁寧に答えてください。必ず日本語で返答してください。",
  tools: [searchRecipe],
});
