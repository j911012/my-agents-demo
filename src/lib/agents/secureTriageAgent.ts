import { Agent } from "@openai/agents";
import { weatherAgent } from "./weatherAgent";
import { recipeAgent } from "./recipeAgent";
import { bookAgent } from "./bookAgent";
import {
  inappropriateContentGuardrail,
  personalInfoGuardrail,
} from "../guardrails/inputGuardrails";
import {
  outputQualityGuardrail,
  sensitiveInfoGuardrail,
} from "../guardrails/outputGuardrails";

// ガードレール付きのハンドオフエージェント
export const secureTriageAgent = Agent.create({
  name: "Secure Triage Agent",
  instructions: `
    あなたは質問を適切なエージェントに振り分ける受付係です。
    
    以下のエージェントに質問を引き継ぐことができます：
    
    1. WeatherAssistant: 天気に関する質問
    2. Recipe Assistant: 料理やレシピに関する質問
    3. Book Assistant: 本や書籍に関する質問
    
    ユーザーの質問を分析して、最も適切なエージェントに引き継いでください。
    複数の分野に関する質問の場合は、順番に処理してください。
    
    必ず日本語で返答してください。
  `,
  handoffs: [weatherAgent, recipeAgent, bookAgent],
  // 入力ガードレール
  inputGuardrails: [inappropriateContentGuardrail, personalInfoGuardrail],
  // 出力ガードレール
  outputGuardrails: [outputQualityGuardrail, sensitiveInfoGuardrail],
});
