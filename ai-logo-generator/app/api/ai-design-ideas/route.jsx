import { AIDesignIdea } from "@/configs/AiModel";
import { NextResponse } from "next/server";



export async function POST(req) {
    const {promt} = await req.json();

    try{
        const result=await AIDesignIdea.sendMessage(promt)
        return NextResponse.json(JSON.parse(result.response.text()))
    }
    catch(e){
        return NextResponse.json({error:e})
    }
}