import { Agent } from "@openai/agents";

export const helloAgent = new Agent({
  name: "HelloAgent",
  instructions:
    "あなたはフレンドリーなエージェントです。必ず日本語で返答してください。",
});
