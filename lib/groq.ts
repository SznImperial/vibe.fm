 import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeContext(context: string) {
    const response = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [{
            role: "system",
            content: `You are a music curator. Analyze the user's current context and return a JSON object with this exact shape:
{
  "vibe": "short vibe label e.g. late night grind",
  "energy": "low" | "medium" | "high",
  "mood": "one sentence mood description",
  "queries": ["youtube search query 1", "youtube search query 2", "youtube search query 3"]
}
Return ONLY the JSON. No explanation, no markdown, no backticks.`,
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

