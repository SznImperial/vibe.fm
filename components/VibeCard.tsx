import {VibeProfile} from "@/lib/types";

type Props = {
    profile: VibeProfile;
};

export default function VibeCard({profile}: Props) {
    return (
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
            <p className="text-zinc-400 text-sm mb-1">your vibe</p>
            <h2 className="text-2xl font-bold mb-1">{profile.vibe}</h2>
            <p className="text-zinc-300 text-sm mb-3">{profile.mood}</p>
            <span className="text-xs bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full">
                energy: {profile.energy}
            </span>
        </div>
    )
}
