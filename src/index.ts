import express from "express";
import {
  saveOccurrence,
  searchByIssue,
  startIndex,
} from "./occurrence.service";
import { z } from "zod";
import authenticate from "./auth.middleware";

// Create the index if it doesn't exist
await startIndex();

const app = express();
app.use(express.json());
app.use(authenticate)

app.post("/occurrence", async (request, response) => {
  try {
    console.log(request.body)
    const Occurrence = z.object({
      issue: z.string(),
      tag: z.string(),
    });

    const occurrenceParsed = Occurrence.parse(request.body);

    await saveOccurrence(occurrenceParsed);
    return response.json({ message: "Occurrence saved" });
  } catch (error) {
    return response.status(400).json({ error: error.errors });
  }
});

app.post("/occurrence/search", async (request, response) => {
  try {
    const OccurrenceSearch = z.object({
      issue: z.string(),
    });

    const { issue } = OccurrenceSearch.parse(request.body);

    const result = await searchByIssue(issue);
    return response.json(result);
  } catch (error) {
    return response.status(400).json({ error: error.errors });
  }
});

console.log("Server is running on port 3000");
await app.listen({ port: 3000 });
