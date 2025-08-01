import { Agent, run, InputGuardrail } from "@openai/agents";
import { z } from "zod";

// 不適切な内容をチェックするガードレールエージェント
const inappropriateContentAgent = new Agent({
  name: "Inappropriate Content Checker",
  instructions:
    "ユーザーの入力が不適切な内容（暴力的、グロテスク、性的、差別的など）を含んでいるかをチェックしてください。",
  outputType: z.object({
    isInappropriate: z.boolean(), // 不適切な内容を含んでいたらtrue
    reason: z.string(), // 不適切な内容の理由
    category: z.enum(["暴力", "グロテスク", "性的", "差別", "その他", "適切"]), // 不適切な内容のカテゴリ
  }),
});

// 入力ガードレール
export const inappropriateContentGuardrail: InputGuardrail = {
  name: "Inappropriate Content Guardrail",
  execute: async ({ input, context }) => {
    const result = await run(inappropriateContentAgent, input, { context });

    return {
      outputInfo: result.finalOutput,
      tripwireTriggered: result.finalOutput?.isInappropriate ?? false,
    };
  },
};

// 個人情報をチェックするガードレールエージェント
const personalInfoAgent = new Agent({
  name: "Personal Info Checker",
  instructions:
    "ユーザーの入力に個人情報（電話番号、メールアドレス、住所など）が含まれているかをチェックしてください。",
  outputType: z.object({
    hasPersonalInfo: z.boolean(),
    reasoning: z.string(),
    infoType: z.enum([
      "電話番号",
      "メールアドレス",
      "住所",
      "クレジットカード",
      "その他",
      "なし",
    ]),
  }),
});

// 個人情報ガードレール
export const personalInfoGuardrail: InputGuardrail = {
  name: "Personal Info Guardrail",
  execute: async ({ input, context }) => {
    const result = await run(personalInfoAgent, input, { context });

    return {
      outputInfo: result.finalOutput,
      tripwireTriggered: result.finalOutput?.hasPersonalInfo ?? false,
    };
  },
};
