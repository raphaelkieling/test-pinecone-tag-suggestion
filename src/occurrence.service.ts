import { embeddings } from "./utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { nanoid } from "nanoid";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_KEY ?? "",
});

const indexName = "occurrence";
const index = await pc.Index(indexName);

/**
 * Starts the index creation process.
 * If the index already exists, it skips the creation.
 */
export async function startIndex() {
  const indexes = await pc.listIndexes();
  if (indexes.indexes?.find((i) => i.name === indexName)) {
    console.log("Skipping index creation, index already exists");
    return;
  }

  console.log("Creating index");
  await pc.createIndex({
    name: indexName,
    dimension: 1536,
    metric: "euclidean",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });
}

/**
 * Searches for occurrences of an issue in the index.
 * @param issue - The issue to search for.
 * @returns A promise that resolves to an array of matches found in the index.
 */
export async function searchByIssue(issue: string) {
  console.info(`Received issue: ${issue}`);

  const vector = await embeddings(issue);

  const result = await index.query({
    topK: 5,
    vector,
    includeMetadata: true,
    includeValues: false,
  });

  if (!result.matches) {
    return [];
  }

  return result.matches;
}

/**
 * Saves an occurrence with the specified issue and tag.
 * @param params - The parameters for saving the occurrence.
 * @param params.issue - The issue to save.
 * @param params.tag - The tag associated with the issue.
 * @returns A promise that resolves when the occurrence is saved.
 */
export async function saveOccurrence(params: { issue: string; tag: string }) {
  const { issue, tag } = params;

  console.info(`Received issue: ${issue} with tag: ${tag}`);

  await index.upsert([
    {
      id: nanoid(),
      values: await embeddings(issue),
      metadata: {
        issue,
        tag,
      },
    },
  ]);
}
