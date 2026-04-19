import OpenAI from "openai";
import { AIProductResult } from "../types";

export const generateHardwareSpecs = async (prompt: string): Promise<AIProductResult> => {
  // Using the OpenAI API key from environment variables
  const apiKey = process.env.OPENAI_API_KEY; 
  
  if (!apiKey) {
    throw new Error("OpenAI API Key is missing. Please add it to your .env file as OPENAI_API_KEY.");
  }

  // Initialize OpenAI Client
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const systemInstruction = `
    You are MatterForce India, an Empathetic Engineering Partner.
    Your goal is to analyze the User's Intent (Context, Budget, Skill Level) and engineer the perfect solution.

    1. **INTENT ANALYSIS**: Determine who the user is (e.g., Student, Hobbyist, Farmer, Industrialist).
       - TIER_1_HOBBY: School projects, learning, low budget, safety first (Blue Theme).
       - TIER_2_MAKER: Serious DIY, robust prototyping, mid-budget.
       - TIER_3_INDUSTRIAL: Professional use, durability, high budget, reliability (Orange Theme).

    2. **MARKET SWEEP**: Estimate realistic Lowest Valid Prices in Indian Rupees (INR) from vendors like Robu.in, Amazon.in, and Lajpat Rai Market.
       - Calculate "totalSavings" by comparing your optimized price vs. a standard retail markup (approx 15-20% savings).

    3. **COMPONENT SELECTION**: 
       - Select parts appropriate for the Tier. (e.g., Plastic gears for Tier 1, Metal gears for Tier 3).
       - Provide a specific "reason" for every component choice (e.g., "Safe for kids", "Waterproof for farm use").

    4. **GUIDE GENERATION (Build Process)**: 
       - Generate a COMPLETE Step-by-Step Guide (from Step 1 to Testing).
       - Ensure at least 5-7 distinct steps.
       - **Tier 1 (Student)**: Use simple, encouraging language. (e.g., "Step 1: Carefully glue the motor to the base using double-sided tape.").
       - **Tier 3 (Industrial)**: Use technical, precise language. (e.g., "Step 1: Mount the NEMA 23 stepper using M4 screws and align with the chaotic axis.").

    The output must be strictly JSON matching this schema:
    {
      "productName": "string",
      "description": "string",
      "intentAnalysis": "string",
      "complexityTier": "TIER_1_HOBBY" | "TIER_2_MAKER" | "TIER_3_INDUSTRIAL",
      "category": "string",
      "technicalSpecs": ["string"],
      "components": [
        {
          "name": "string",
          "cost": number,
          "specs": "string",
          "vendor": "string",
          "reason": "string"
        }
      ],
      "diyPrice": number,
      "assembledPrice": number,
      "totalSavings": number,
      "estimatedBuildTime": "string",
      "assemblySteps": ["string"]
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
  });

  const responseText = response.choices[0].message.content;

  if (!responseText) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(responseText) as AIProductResult;
  } catch (e) {
    console.error("Failed to parse OpenAI response", e);
    throw new Error("Engineering logic failed. Please try again.");
  }
};

export const generateVeoVideo = async (
  imageBase64: string, 
  prompt: string, 
  aspectRatio: '16:9' | '9:16'
): Promise<string> => {
  // OpenAI does not currently have a direct, widely available API equivalent to Google's Veo for video generation.
  // For this ChatGPT version, we will return a placeholder or throw an error indicating it requires Gemini.
  
  console.warn("Video generation is currently disabled when using the OpenAI/ChatGPT backend.");
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a placeholder video URL (e.g., a sample tech video)
  return "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
};