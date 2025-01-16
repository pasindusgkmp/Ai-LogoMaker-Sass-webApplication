// import { AILogoPrompt } from "@/configs/AiModel";
// import { NextResponse } from "next/server";
// import axios from "axios";


// export async function POST(req) {
//     const {prompt} = await req.json();

//     try{
//         //generate ai text prompt for logo
//         const AiPromtResult = await AILogoPrompt.sendMessage(prompt);
//         console.log(JSON.parse(AiPromtResult.response.text()))
//         const AIPromt = JSON.parse(AiPromtResult.response.text()).prompt;


//         //generate logo from ai model
//         const response=await axios.post('https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
//             AIPromt,{
//                 headers: {
//                     Authorization: "Beare "+process.env.HUGGING_FACE_API_KEY,
//                     "Content-Type": "application/json",
//                 },
//                 responseType:"arraybuffer"
//             }


//         )


//         //convert to base64 image

//         const buffer = Buffer.from(response.data,"binary");
//         const base64Image = buffer.toString("base64");


//         const base64ImageWithMime = `data:image/png:base64,${base64Image}`;
//         console.log(base64ImageWithMime)




//         //save to firebase 


//         return NextResponse.json({image:base64ImageWithMime})

//         //ai logo image model
//     // }catch (error) {
//     //     return NextResponse.json({error:e})
//     //   }

//     }catch (error) {
//         return NextResponse.json({error: error.message});
//     }
// }


import { AILogoPrompt } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        // Extract prompt from request body
        const { prompt } = await req.json();

        // Generate AI text prompt for logo
        const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

        // Parse AI response
        const parsedResponse = JSON.parse(await AiPromptResult.response.text());
        const AIPrompt = parsedResponse?.prompt;

        if (!AIPrompt) {
            throw new Error("Invalid AI prompt response. Check the input or AI service.");
        }

        console.log("Generated AI Prompt:", AIPrompt);

        // Generate logo from Hugging Face AI model
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
            { inputs: AIPrompt }, // Ensure proper format based on API docs
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer", // Expect binary data
            }
        );

        // Convert binary response to Base64 image
        const buffer = Buffer.from(response.data, "binary");
        const base64Image = buffer.toString("base64");
        const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

        console.log("Generated Base64 Image:", base64ImageWithMime);

        // Return the generated logo image
        return NextResponse.json({ image: base64ImageWithMime });
    } catch (error) {
        console.error("Error during AI logo generation:", error);

        // Handle and decode API errors
        let errorMessage = "An error occurred while generating the logo.";
        if (error.response?.data) {
            const errorData = Buffer.from(error.response.data).toString("utf-8");
            try {
                const parsedError = JSON.parse(errorData);
                errorMessage = parsedError?.error || errorMessage;
            } catch (parseError) {
                console.error("Error parsing error response:", parseError);
            }
        }

        // Return the error as JSON
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}



