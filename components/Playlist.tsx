import { Track } from "@/lib/types";
import Image from "next/image";

type Props = {
  tracks: Track[];
  activeTrack: Track | null;
  onSelect: (track: Track) => void;
};

export default function Playlist({ tracks, activeTrack, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-zinc-400 text-sm">your playlist</p>
      {tracks.map((track) => (
        <div
          key={track.videoId}
          onClick={() => onSelect(track)}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition border ${
            activeTrack?.videoId === track.videoId
              ? "border-white bg-zinc-800"
              : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
          }`}
        >
          <Image 
          src={track.thumbnail}
          alt={track.title}
          width={64}
          height={48}
          className="rounded-lg object-cover"
          />
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-medium truncate">{track.title}</p>
            <p className="text-xs text-zinc-400">{track.channel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}