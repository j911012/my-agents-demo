import "dotenv/config";
import { run } from "@openai/agents";
import { weatherAgent } from "@/lib/agents/weatherAgent";
import { recipeAgent } from "@/lib/agents/recipeAgent";
import { bookAgent } from "@/lib/agents/bookAgent";

(async () => {
  console.log("=== 複数エージェントの比較テスト ===\n");

  const agents = [
    {
      name: "WeatherAgent",
      agent: weatherAgent,
      question: "東京の天気を教えて",
    },
    {
      name: "RecipeAgent",
      agent: recipeAgent,
      question: "カレーのレシピを教えて",
    },
    {
      name: "BookAgent",
      agent: bookAgent,
      question: "吾輩は猫であるについて教えて",
    },
  ];

  for (const { name, agent, question } of agents) {
    console.log(`--- ${name} ---`);
    console.log(`質問: ${question}`);

    try {
      const result = await run(agent, question);
      console.log(`回答: ${result.finalOutput}`);
    } catch (error) {
      console.log(`エラー: ${error}`);
    }
    console.log("\n");
  }
})();
