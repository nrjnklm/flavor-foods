import { GoogleGenAI } from "@google/genai";
import { FoodItem } from "../types";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefSuggestion = async (item: FoodItem): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      I am a customer at "FlavorCraft Foods" looking at the "${item.name}".
      The description is: "${item.description}".
      
      Act as a charismatic, expert chef. Give me a very short (max 2 sentences) recommendation on how to customize this item (e.g., "Make it spicy!", "Add extra cheese for richness") or what drink pairs well with it.
      Keep it fun and appetizing.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Our chef recommends adding extra cheese for a richer taste!";
  } catch (error) {
    console.error("Error fetching chef suggestion:", error);
    return "Try customizing it with your favorite toppings for a unique flavor!";
  }
};
