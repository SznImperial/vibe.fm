import {VibeProfile} from "@/lib/types";

type Props = {
    profile: VibeProfile;
};

export default function VibeCard({profile}: Props) {
    return (
        <div 
          className="rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden" 
          style={{
            backgroundColor: "rgba(15, 15, 15, 0.6)", 
            borderColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
          }}
        >
            {/* Ambient accent background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10 blur-2xl pointer-events-none"
                 style={{ backgroundColor: "var(--accent)" }} />
            
            <p className="text-xs uppercase tracking-widest mb-2 font-bold" style={{color: "var(--muted)", fontFamily: "var(--font-space-grotesk)"}}>
              your vibe
            </p>
            <h2 className="text-3xl font-black mb-3 tracking-tight bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent" 
                style={{fontFamily: "var(--font-space-grotesk)"}}>
              {profile.vibe}
            </h2>
            <p className="text-sm mb-5 leading-relaxed font-medium" style={{color: "var(--muted)", fontFamily: "var(--font-inter)"}}>
              {profile.mood}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full tracking-wide" 
                    style={{backgroundColor: "var(--accent)", color: "#000", fontFamily: "var(--font-space-grotesk)"}}>
                energy: {profile.energy}
              </span>
            </div>
        </div>
    );
}
