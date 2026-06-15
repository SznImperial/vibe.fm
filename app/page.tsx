"use client";
import { useState } from "react";
import ContextInput from "@/components/ContextInput";
import VibeCard from "@/components/VibeCard";
import Playlist from "@/components/Playlist";
import Player from "@/components/Player";
import {AnalyzeResponse, Track} from "@/lib/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);

  async function handleAnalyze(context: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({context}),
      });
      const json = await res.json();
      setData(json);
      if (json.tracks && json.tracks.length > 0) {
        setActiveTrack(json.tracks[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  function handleEnded() {
    if (!data) return;
    const currentIndex = data.tracks.findIndex(
      (t) => t.videoId === activeTrack?.videoId
    );
    const nextTrack = data.tracks[currentIndex + 1];
    if (nextTrack) setActiveTrack(nextTrack);
  }
  return (
    <main 
      className={`min-h-screen w-full max-w-2xl self-center px-6 py-12 flex flex-col transition-all duration-500 ease-in-out ${
        !data ? "justify-center" : "justify-start"
      }`} 
      style={{backgroundColor: "var(--bg)"}}
    >
      
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-(--accent) opacity-[0.02] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-(--accent) opacity-[0.015] blur-[120px] pointer-events-none" />

      <div className={`mb-10 text-center transition-all duration-500 ${!data ? "translate-y-0" : "translate-y-0"}`}>
        <h1 
          className="text-5xl md:text-6xl font-black tracking-tight mb-3 bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent" 
          style={{fontFamily: "var(--font-space-grotesk)"}}
        >
          vibe<span className="text-(--accent) font-light">.fm</span>
        </h1>
        <p className="text-sm md:text-base font-medium tracking-wide uppercase text-zinc-500" style={{fontFamily: "var(--font-space-grotesk)"}}>
          music for whatever you are doing
        </p>
      </div>

      <ContextInput onAnalyze={handleAnalyze} loading={loading} />

      {data && !data.error && (
        <div className="mt-8 flex flex-col gap-6 w-full">
          <VibeCard profile={data.profile} />
          <Player track={activeTrack} onEnded={handleEnded} /> 
          <Playlist
            tracks={data.tracks}
            activeTrack={activeTrack}
            onSelect={setActiveTrack} 
          />
        </div>
      )}
    </main>
  );
}