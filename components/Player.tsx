"use client";

import { useEffect, useRef } from "react";
import { Track } from "@/lib/types";

/* ── YouTube IFrame API type shims ─────────────────────────── */
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

/* ── Component ─────────────────────────────────────────────── */
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

  if (!track) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700">
      <div id="yt-player" ref={containerRef} />
      <div className="p-3 bg-zinc-900">
        <p className="text-sm font-medium truncate">{track.title}</p>
        <p className="text-xs text-zinc-400">{track.channel}</p>
      </div>
    </div>
  );
}
