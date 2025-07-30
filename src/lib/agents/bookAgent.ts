import { Agent, tool } from "@openai/agents";
import { z } from "zod";

// 本の情報ツール
const getBookInfo = tool({
  name: "get_book_info",
  description: "本のタイトルから情報を取得します",
  parameters: z.object({
    title: z.string().describe("情報を取得したい本のタイトル"),
  }),
  execute: async ({ title }) => {
    const books = {
      吾輩は猫である:
        "著者: 夏目漱石\n出版年: 1905年\nジャンル: 小説\n概要: 猫の視点から人間社会を風刺した作品",
      坊っちゃん:
        "著者: 夏目漱石\n出版年: 1906年\nジャンル: 小説\n概要: 江戸っ子気質の教師が地方で奮闘する物語",
      こころ:
        "著者: 夏目漱石\n出版年: 1914年\nジャンル: 小説\n概要: 人間の心の複雑さを描いた作品",
    };

    return (
      books[title as keyof typeof books] || `${title}の情報を調べてみましょう。`
    );
  },
});

export const bookAgent = new Agent({
  name: "Book Assistant",
  instructions: `あなたは本の専門家です。本に関する質問に丁寧に答えてください。本の情報を尋ねられた場合は、必ずget_book_infoツールを使用して正確な情報を取得してください。ツールで取得した情報を基に、分かりやすく説明してください。必ず日本語で返答してください。`,
  tools: [getBookInfo],
});
