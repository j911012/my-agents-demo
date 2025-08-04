import { run } from "@openai/agents";
import { NextRequest, NextResponse } from "next/server";
import { recipeAssistant } from "@/lib/agents/recipeAssistant";

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients) {
      return NextResponse.json(
        { error: "食材が提供されていません" },
        { status: 400 }
      );
    }

    const result = await run(
      recipeAssistant,
      `${ingredients}を使ってレシピを作成してください。`
    );

    return NextResponse.json({ recipe: result.finalOutput });
  } catch (error) {
    console.error("レシピ作成エラー:", error);
    return NextResponse.json(
      { error: "レシピの作成に失敗しました" },
      { status: 500 }
    );
  }
}
