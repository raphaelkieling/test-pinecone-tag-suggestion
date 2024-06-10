import OpenAI from "openai";

const openai = new OpenAI();

/**
 * Generates embeddings for the given data using the OpenAI text-embedding model.
 * @param data The input data for which embeddings need to be generated.
 * @returns The embedding generated for the input data.
 */
export async function embeddings(data: string) {
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: data,
  });

  return result.data[0].embedding;
}
