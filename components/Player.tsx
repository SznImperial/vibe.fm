"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Track } from "@/lib/types";


interface YTPlayerEvent {
  data: number;
}

interface YTPlayer {
  destroy: () => void;
}

interface YTPlayerConstructor {
  new (
    elementId: string,
    config: {
      videoId: string;
      height: string;
      width: string;
      playerVars: Record<string, number>;
      events: { onStateChange: (event: YTPlayerEvent) => void };
    }
  ): YTPlayer;
}

interface YTNamespace {
  Player: YTPlayerConstructor;
  PlayerState: { ENDED: number };
}

declare global {
  interface Window {
    YT: YTNamespace;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}


type Props = {
  track: Track | null;
  onEnded: () => void;
};

export default function Player({ track, onEnded }: Props) {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onEndedRef = useRef(onEnded);

  
  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

 
  useEffect(() => {
    if (window.YT) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  
  useEffect(() => {
    if (!track) return;

    const videoId = track.videoId;

    function createPlayer() {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        height: "200",
        width: "100%",
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event: YTPlayerEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEndedRef.current();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [track]);

  const [audioOnly, setAudioOnly] = useState(false);

  if (!track) return null;
  return (
    <div 
      className="rounded-2xl overflow-hidden border transition-all duration-300" 
      style={{
        borderColor: "rgba(255, 255, 255, 0.08)",
        backgroundColor: "rgba(15, 15, 15, 0.6)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
      }}
    >
      <div style={{ height: audioOnly ? 0 : "200px", overflow: "hidden" }}>
        <div id="yt-player" ref={containerRef} />
      </div>
      
      {audioOnly && (
        <div 
          className="h-50 flex flex-col items-center justify-center relative overflow-hidden" 
          style={{ backgroundColor: "rgba(10, 10, 10, 0.7)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
        >
          {/* Blurred Background Art */}
          <div className="absolute inset-0 w-full h-full opacity-25 blur-xl pointer-events-none scale-110">
            <Image 
              src={track.thumbnail}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Central Cover Art Card */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-10 mb-3 flex items-center justify-center bg-zinc-900">
            <Image 
              src={track.thumbnail}
              alt={track.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          
          {/* Equalizer animation */}
          <div className="flex items-end gap-1.5 h-6 mb-2 z-10">
            <span className="w-0.5 bg-(--accent) rounded-full eq-bar" style={{ height: '8px' }} />
            <span className="w-0.5 bg-(--accent) rounded-full eq-bar" style={{ height: '18px' }} />
            <span className="w-0.5 bg-(--accent) rounded-full eq-bar" style={{ height: '10px' }} />
            <span className="w-0.5 bg-(--accent) rounded-full eq-bar" style={{ height: '22px' }} />
            <span className="w-0.5 bg-(--accent) rounded-full eq-bar" style={{ height: '12px' }} />
          </div>
          
          <p className="text-[9px] uppercase tracking-widest font-bold z-10 text-zinc-400" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            audio-only mode active
          </p>
        </div>
      )}
      
      <div className="p-5 flex items-center justify-between" style={{backgroundColor: "rgba(10, 10, 10, 0.4)"}}>
        <div className="flex flex-col overflow-hidden pr-4">
          <p className="text-sm font-bold truncate" style={{color: "var(--text)", fontFamily: "var(--font-space-grotesk)"}}>{track.title}</p>
          <p className="text-xs font-medium mt-0.5" style={{color: "var(--muted)", fontFamily: "var(--font-inter)"}}>{track.channel}</p>
        </div>
        <button
          onClick={() => setAudioOnly(!audioOnly)}
          className="text-xs font-bold px-4 py-2 rounded-full shrink-0 transition-all duration-200 hover:scale-105 hover:bg-zinc-900 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)", 
            color: "var(--text)", 
            fontFamily: "var(--font-space-grotesk)",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          {audioOnly ? "show video" : "audio only"} 
        </button>
      </div>
    </div>
  );
}
