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


  export const AILogoPrompt = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a text prompt to create Logo for Logo Title/Brand name : cdscs,with description: csdcd, with Color combination of Ocean Blues, also include the undefined and include Modern Mascot Logos design idea and Referring to this Logo Prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.  Give me result in JSON portal with prompt field only"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"prompt\": \"Create a modern mascot logo for the brand \\\"cdscs\\\" (description: csdcd). Use a color combination of ocean blues. The logo should be a vibrant design featuring a friendly, animated character with a playful expression. This character should be dressed in a classic uniform, with a distinctive accessory that adds to its personality. The character should hold a signature item representing the brand. Consider adding small decorative touches or natural accents to enhance the overall look. The background should be a bold, circular design with subtle accents to highlight the character. The brand name, \\\"cdscs\\\", should be displayed below the mascot in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style should be fun, welcoming, and full of character, but maintain an undefined aspect that makes the logo unique and memorable.\"\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());


