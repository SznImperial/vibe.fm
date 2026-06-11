/* eslint-disable @typescript-eslint/no-explicit-any */
import {Track} from "./types";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function searchTracks(queries: string[]): Promise<Track[]> {
    const results = await Promise.all(
        queries.map((query)=> searchYouTube(query)
    )
    );
    return results.flat();
}

async function searchYouTube(query:string): Promise<Track[]> {
    const url = `${BASE_URL}/search?part=snippet&type=video&videoCategoryId=10&maxResults=3&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if(!data.items) return [];

    return data.items.map((item: any)=> ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
    }));
}