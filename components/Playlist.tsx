import { Track } from "@/lib/types";
import Image from "next/image";

type Props = {
  tracks: Track[];
  activeTrack: Track | null;
  onSelect: (track: Track) => void;
};

export default function Playlist({ tracks, activeTrack, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs uppercase tracking-widest font-bold" style={{color: "var(--muted)", fontFamily: "var(--font-space-grotesk)"}}>
          your playlist
        </p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
          {tracks.length} tracks
        </span>
      </div>
      
      <div className="flex flex-col gap-2 max-h-87.5 overflow-y-auto pr-1">
        {tracks.map((track, index) => {
          const isActive = activeTrack?.videoId === track.videoId;
          return (
            <div
              key={track.videoId}
              onClick={() => onSelect(track)}
              className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border group"
              style={{
                backgroundColor: isActive ? "rgba(200, 255, 0, 0.03)" : "rgba(20, 20, 20, 0.2)",
                borderColor: isActive ? "var(--accent)" : "rgba(255, 255, 255, 0.05)",
                boxShadow: isActive ? "0 0 15px rgba(200, 255, 0, 0.1)" : "none"
              }}
            >
             
              <div className="w-5 text-center shrink-0 flex items-center justify-center font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {isActive ? (
                  <span className="text-(--accent) text-xs animate-pulse">▶</span>
                ) : (
                  <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">{index + 1}</span>
                )}
              </div>

              
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-950 border border-white/5">
                <Image 
                  src={track.thumbnail}
                  alt={track.title}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              
              <div className="flex flex-col overflow-hidden flex-1">
                <p className="text-sm font-bold truncate group-hover:text-(--accent) transition-colors" 
                   style={{
                     color: isActive ? "var(--accent)" : "var(--text)", 
                     fontFamily: "var(--font-space-grotesk)"
                   }}>
                  {track.title}
                </p>
                <p className="text-xs mt-0.5" style={{color: "var(--muted)", fontFamily: "var(--font-inter)"}}>
                  {track.channel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}