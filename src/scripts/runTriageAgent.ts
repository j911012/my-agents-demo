import "dotenv/config";
import { run } from "@openai/agents";
import { triageAgent } from "@/lib/agents/triageAgent";

(async () => {
  console.log("=== 既存エージェントを使ったハンドオフデモ ===\n");

  const testCases = [
    {
      name: "挨拶",
      input: "こんにちは！",
    },
    {
      name: "天気",
      input: "東京の天気を教えてください",
    },
    {
      name: "レシピ",
      input: "カレーのレシピを教えてください",
    },
    {
      name: "本",
      input: "吾輩は猫であるについて教えてください",
    },
    {
      name: "複合質問",
      input: "カレーのレシピを教えて、それから東京の天気も教えてください",
    },
  ];

  for (const testCase of testCases) {
    console.log(`--- ${testCase.name} ---`);
    console.log(`質問: ${testCase.input}`);

    try {
      const result = await run(triageAgent, testCase.input);
      console.log(`回答: ${result.finalOutput}`);
      console.log(`最終エージェント: ${result.lastAgent?.name}`);
    } catch (error) {
      console.log(`エラー: ${error}`);
    }
    console.log("\n");
  }
})();
