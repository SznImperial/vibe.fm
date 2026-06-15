"use client";

import { useState } from "react";

type Props = {
    onAnalyze: (context: string) => void;
    loading: boolean;
};

export default function ContextInput({ onAnalyze, loading }: Props) {
    const [input, setInput] = useState("");

    function handleSubmit(){
        if(!input.trim()) return;
        onAnalyze(input);

    }

    return (
        <div 
          className="flex flex-col gap-4 w-full p-6 rounded-2xl border transition-all duration-300"
          style={{
            backgroundColor: "rgba(15, 15, 15, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
          }}
        >
            <textarea 
              className="w-full rounded-xl p-4 resize-none outline-none border transition-all duration-200 text-sm focus:border-(--accent) focus:shadow-[0_0_15px_rgba(200,255,0,0.1)]" 
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)", 
                color: "var(--text)", 
                borderColor: "rgba(255, 255, 255, 0.05)", 
                fontFamily: "var(--font-inter)"
              }}
              rows={4}
              placeholder="what are you doing? how do you want to feel? describe your vibe..."
              value={input}
              onChange={(e)=> setInput(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full font-bold rounded-xl py-3.5 transition-all duration-200 disabled:opacity-50 text-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer hover:shadow-[0_0_15px_rgba(200,255,0,0.3)]"
              style={{
                backgroundColor: "var(--accent)", 
                color: "#000", 
                fontFamily: "var(--font-space-grotesk)"
              }}
            >
                {loading ? "finding your vibe..." : "get my playlist"}
            </button>
        </div>
    );
}