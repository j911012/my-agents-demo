import { Agent } from "@openai/agents";
import {
  inappropriateContentGuardrail,
  personalInfoGuardrail,
} from "@/lib/guardrails/inputGuardrails";
import {
  outputQualityGuardrail,
  sensitiveInfoGuardrail,
} from "@/lib/guardrails/outputGuardrails";
import { recipeCreationAgent } from "./recipeCreationAgent";
import { nutritionCalcAgent } from "./nutritionCalcAgent";
import { cookingInstructionsAgent } from "./cookingInstructionsAgent";

// エージェントをツールとして使用
const createRecipeTool = recipeCreationAgent.asTool({
  toolName: "createRecipe",
  toolDescription: "レシピ提案エージェントを実行",
});

const calculateNutritionTool = nutritionCalcAgent.asTool({
  toolName: "calculateNutrition",
  toolDescription: "栄養計算エージェントを実行",
});

const generateCookingInstructionsTool = cookingInstructionsAgent.asTool({
  toolName: "generateCookingInstructions",
  toolDescription: "調理手順エージェントを実行",
});

export const recipeAssistant = new Agent({
  name: "Recipe Creation Assistant",
  instructions: `
    あなたは包括的なレシピ作成アシスタントです。
    
    以下の5段階のプロセスでレシピを作成します：
    
    1. **入力チェック**: 不適切な内容や個人情報がないかチェック
    2. **レシピ提案**: 食材からレシピを提案
    3. **栄養計算**: 栄養価を計算・評価
    4. **調理手順**: 詳細な調理手順を生成
    5. **品質チェック**: 最終出力の品質を確認
    
    各段階で専門エージェントを活用し、最終的に以下の形式で統合されたレシピを提供してください：
    
    【レシピ名】
    
    【材料】（分量）
    
    【栄養成分表】
    
    【調理手順】
    
    【調理時間・難易度】
    
    【ポイント・コツ】
    
    【栄養バランス評価】
    
    必ず日本語で返答してください。
  `,
  inputGuardrails: [inappropriateContentGuardrail, personalInfoGuardrail],
  outputGuardrails: [outputQualityGuardrail, sensitiveInfoGuardrail],
  tools: [
    createRecipeTool,
    calculateNutritionTool,
    generateCookingInstructionsTool,
  ],
});
