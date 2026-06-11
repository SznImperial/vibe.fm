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
        <div className="flex-col gap-3">
            <textarea 
            className="w-full bg-zinc-900 text-white rounded-xl p-4 resize-none outline-none border border-zinc-700 focus:border-zinc-400 transition"
            rows={4}
            placeholder="what are you doing? how do you want to feel? describe your vibe..."
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            />
            <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-black font-semibold rounded-xl py-3 hover:bg-zinc-200 transition disabled:opacity-50"
            >
                {loading ? "finding your vibe..." : "get my playlist"}
            </button>
        </div>
    )
}