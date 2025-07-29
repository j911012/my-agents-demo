import { Agent, tool } from "@openai/agents";
import { z } from "zod";

const getWeather = tool({
  name: "getWeather",
  description: "都市名を受け取り現在の天気を返す",
  parameters: z.object({ city: z.string() }),
  execute: async ({ city }) => `${city} は快晴、気温 25℃です ☀️`,
});

export const weatherAgent = new Agent({
  name: "WeatherAssistant",
  instructions: "あなたは気象予報士です。丁寧な日本語で答えてください。",
  tools: [getWeather],
});
