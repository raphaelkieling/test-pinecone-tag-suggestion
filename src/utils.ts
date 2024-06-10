import OpenAI from "openai";

const openai = new OpenAI();

export async function embeddings(data: string) {
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: data,
  });

  return result.data[0].embedding;
}
