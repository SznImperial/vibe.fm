import { Track } from "@/lib/types";

type Props = {
    track: Track | null;
};
export default function Player({ track }: Props) {
    if (!track) return null;

    return (
        <div className="rounded-xl overflow-hidden border border-zinc-700">
            <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
            />
            <div className="p-3 bg-zinc-900">
                <p className="text-sm font-medium truncate">{track.title}</p>
                <p className="text-xs text-zinc-400">{track.channel}</p>
            </div>

        </div>
    )
}

