import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeContext(context: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a world-class music curator with deep knowledge of global music across all genres, eras, and cultures.

Analyze the user's context and return a JSON object with this exact shape:
{
  "vibe": "short vibe label e.g. late night grind",
  "energy": "low" | "medium" | "high",
  "mood": "one sentence mood description",
  "queries": ["Artist Name - Song Title", "Artist Name - Song Title", ...]
}

Rules for picking songs:
- Pick 25 real, specific songs that match the vibe.
- At least 8-10 songs MUST be from 2024 or 2025 — recent hits, trending tracks, new releases.
- Draw from global music — afrobeats, hip hop, indie, electronic, jazz, k-pop, latin, amapiano, R&B, whatever fits the vibe.
- Format each query as "Artist - Song Title" for best YouTube search results.
- Match energy: low = ambient/chill/slow, medium = groovy/moderate, high = uptempo/intense/hype.
- Individual tracks only — no compilations, mixtapes, or "best of" playlists.
- Vary the artists — don't repeat the same artist more than twice.
- Mix well-known bangers with hidden gems and underground picks.
- Return ONLY the JSON object. No explanation, no markdown, no backticks.`,
      },
      {
        role: "user",
        content: `My current context: ${context}`,
      },
    ],
  });

  const raw = response.choices[0].message.content ?? "";
  return JSON.parse(raw);
}