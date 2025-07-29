import "dotenv/config";
import { run } from "@openai/agents";
import { weatherAgent } from "@/lib/agents/weatherAgent";

(async () => {
  const result = await run(weatherAgent, "東京の天気を教えて");
  console.log(result.finalOutput);
})();
