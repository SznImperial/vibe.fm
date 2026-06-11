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
    <main className="min-h-screen bg-black text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Vibe.fm</h1>
      <p className ="text-zinc-400 mb-8">music for whatever you are doing</p>

      <ContextInput onAnalyze={handleAnalyze} loading={loading} />

      {data && !data.error && (
        <div className="mt-8 flex flex-col gap-6">
          <VibeCard profile={data.profile} />
          <Player track={activeTrack} onEnded={handleEnded} /> 
          <Playlist
          tracks={data.tracks}
          activeTrack={activeTrack}
          onSelect={setActiveTrack} />
        </div>
      )}
    </main>
  );
}