import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeContext(context: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a world-class music curator with deep knowledge of global music across all genres and eras. Analyze the user's current context and return a JSON object with this exact shape: 
        {
          "vibe": "short vibe label e.g late night grind",
          "energy": "low" | "medium" | "high",
          "mood": "one sentence mood description",

          "queries": [
            "Artist Name - Song Title",
             "Artist Name - Song Title",
               ... 20 songs total
          ]
        }
          - Pick 20 real, specific songs that match the vibe
          - Draw from global music — afrobeats, hip hop, indie, electronic, jazz, k-pop, latin, whatever fits
          - Format each query as "Artist - Song Title" for best YouTube results
          - Match energy: low energy = ambient/slow, high energy = uptempo/intense
          - No compilations, no mixtapes, no "best of" playlists — individual tracks only
          - Vary the artists — don't repeat the same artist more than twice
          - Return ONLY the JSON. No explanation, no markdown, no backticks.`
       
      
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