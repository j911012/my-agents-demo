import { Agent, run, OutputGuardrail } from "@openai/agents";
import { z } from "zod";

// 出力の品質をチェックするガードレールエージェント
const outputQualityAgent = new Agent({
  name: "Output Quality Checker",
  instructions:
    "エージェントの出力が適切で有用な内容かをチェックしてください。",
  outputType: z.object({
    isAppropriate: z.boolean(),
    reasoning: z.string(),
    quality: z.enum(["高", "中", "低"]),
  }),
});

// 出力ガードレール
export const outputQualityGuardrail: OutputGuardrail = {
  name: "Output Quality Guardrail",
  async execute({ agentOutput, context }) {
    const result = await run(outputQualityAgent, agentOutput, { context });

    return {
      outputInfo: result.finalOutput,
      tripwireTriggered: !(result.finalOutput?.isAppropriate ?? true),
    };
  },
};

// 機密情報漏洩をチェックするガードレールエージェント
const sensitiveInfoAgent = new Agent({
  name: "Sensitive Info Checker",
  instructions:
    "エージェントの出力に機密情報（APIキー、パスワード、個人情報など）が含まれていないかをチェックしてください。",
  outputType: z.object({
    hasSensitiveInfo: z.boolean(),
    reasoning: z.string(),
    infoType: z.enum(["APIキー", "パスワード", "個人情報", "その他", "なし"]),
  }),
});

// 機密情報ガードレール
export const sensitiveInfoGuardrail: OutputGuardrail = {
  name: "Sensitive Info Guardrail",
  async execute({ agentOutput, context }) {
    const result = await run(sensitiveInfoAgent, agentOutput, { context });

    return {
      outputInfo: result.finalOutput,
      tripwireTriggered: result.finalOutput?.hasSensitiveInfo ?? false,
    };
  },
};
