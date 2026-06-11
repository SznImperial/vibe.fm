# 🎵 vibe.fm

**music for whatever you're doing.**

vibe.fm is an AI-powered music curator that generates personalized YouTube playlists based on your current mood, activity, or energy. Just describe what you're doing — studying late at night, cooking dinner, grinding through a workout — and vibe.fm instantly builds a playlist that matches your moment.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## ✨ Features

- **Context-aware playlists** — Describe your vibe in plain text and get a curated playlist instantly
- **AI-powered analysis** — Uses Groq's LLaMA 3.3 70B to understand your mood, energy level, and context
- **YouTube integration** — Searches and embeds real YouTube music videos with inline playback
- **Vibe profiling** — Displays a breakdown of your detected vibe, mood, and energy level
- **Instant playback** — Click any track to start playing immediately via embedded YouTube player

---

## 🏗️ How It Works

```
 ┌──────────────────────┐
 │  "studying at 2am,   │
 │   need focus music"   │
 └──────────┬───────────┘
            ▼
 ┌──────────────────────┐
 │    Groq (LLaMA 3.3)  │  Analyzes context → returns vibe profile
 │                       │  { vibe, energy, mood, queries[] }
 └──────────┬───────────┘
            ▼
 ┌──────────────────────┐
 │  YouTube Data API v3  │  Searches each query → returns tracks
 └──────────┬───────────┘
            ▼
 ┌──────────────────────┐
 │  Vibe Card + Player   │  Renders profile + embedded playlist
 │  + Playlist UI        │
 └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 
- A [Groq API key](https://console.groq.com/)
- A [YouTube Data API v3 key](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SznImperial/vibe.fm.git
   cd vibe.fm
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** and describe your vibe!

---

## 🛠️ Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/) (App Router)                   |
| Language     | [TypeScript 5](https://www.typescriptlang.org/)                  |
| Styling      | [Tailwind CSS 4](https://tailwindcss.com/)                       |
| AI           | [Groq SDK](https://groq.com/) — LLaMA 3.3 70B Versatile         |
| Music Search | [YouTube Data API v3](https://developers.google.com/youtube/v3)  |
| Fonts        | [Geist](https://vercel.com/font) (Sans + Mono)                   |

---

## 📁 Project Structure

```
vibe.fm/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # POST endpoint — chains AI + YouTube
│   ├── globals.css               # Global styles & Tailwind config
│   ├── layout.tsx                # Root layout with fonts & metadata
│   └── page.tsx                  # Main page — state & UI orchestration
├── components/
│   ├── ContextInput.tsx          # Textarea + submit for vibe input
│   ├── Player.tsx                # YouTube embedded video player
│   ├── Playlist.tsx              # Clickable track list with thumbnails
│   └── VibeCard.tsx              # Displays detected vibe & energy
├── lib/
│   ├── groq.ts                   # Groq AI client — context analysis
│   ├── types.ts                  # Shared TypeScript types
│   └── youtube.ts                # YouTube Data API search client
├── public/                       # Static assets
├── .env.local                    # API keys (not committed)
├── next.config.ts                # Next.js config (image domains)
├── package.json
└── tsconfig.json
```

---

## 📜 API Reference

### `POST /api/analyze`

Analyzes user context and returns a vibe profile with matching tracks.

**Request body:**

```json
{
  "context": "coding at 3am, need something chill and ambient"
}
```

**Response:**

```json
{
  "profile": {
    "vibe": "late night code flow",
    "energy": "low",
    "mood": "Focused and introspective, seeking calm ambient sounds",
    "queries": [
      "ambient coding music",
      "lo-fi chill beats late night",
      "atmospheric electronic focus"
    ]
  },
  "tracks": [
    {
      "videoId": "abc123",
      "title": "3 AM Coding Session - Ambient Mix",
      "thumbnail": "https://i.ytimg.com/vi/abc123/mqdefault.jpg",
      "channel": "ChillBeats"
    }
  ]
}
```

<p align="center">
  built with late-night energy and good vibes ☽
</p>
