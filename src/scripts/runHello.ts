import "dotenv/config";
import { run } from "@openai/agents";
import { helloAgent } from "@/lib/agents/helloAgent";

(async () => {
  const result = await run(helloAgent, "OpenAI Agents SDKってなに？");
  console.log(result.finalOutput);
})();
