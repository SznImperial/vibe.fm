export type VibeProfile = {
    vibe: string;
    energy: "low" | "medium" | "high";
    mood: string;
    queries: string[];
};

export type Track = {
    videoId: string;
    title: string;
    thumbnail: string;
    channel: string;

};

export type AnalyzeResponse = {
    profile: VibeProfile;
    tracks: Track[];
};