import {NextRequest, NextResponse} from 'next/server'
import {analyzeContext} from '@/lib/groq'
import {searchTracks} from "@/lib/youtube"

export async function POST(req: NextRequest) {
    try {
        const {context} = await req.json();
        if (!context) {
            return NextResponse.json(
                {error: "Context is required"},
                {status: 400}
            );
        }               
            
        
        const profile = await analyzeContext(context);
        const tracks = await searchTracks(profile.queries);
        return NextResponse.json({profile, tracks});

    } catch (error) {
        console.error("Error in analyze route:", error);
        return NextResponse.json(
            {error: "An error occurred while analyzing the context"},
            {status: 500}
        );
    }


}