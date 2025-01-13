const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Based on Logo of type modern Generate a text prompt to create Logo for Logo title/Brand name : indian spice with decription: indian resteurant and refering to prompt: Create a vibrant and playful 3D logo for an app. The design should feature bold, colorful text with a glossy finish. Include an icon relevant to the apps theme above the text and a background that complements the concept, such as a bright outdoor scene with natural elements like green grass, a blue sky, and fluffy white clouds. Use a rounded square frame with a yellow border and subtle shadows for a polished and inviting look. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field.only json\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"ideas\": [\n    \"Spice swirl with bold text\",\n     \"Chili pepper glossy frame\",\n     \"Curry pot vibrant icon\",\n     \"Turmeric burst in 3D\"\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());


