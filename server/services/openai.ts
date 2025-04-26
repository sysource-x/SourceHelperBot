import OpenAI from "openai";
import { formatCodeBlock } from "../utils/codeDetector";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const DEFAULT_MODEL = "gpt-4o";

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.API_KEY
});

/**
 * Generates an explanation for a programming concept
 */
export async function generateExplanation(concept: string): Promise<string> {
  try {
    const prompt = `
      You are SourceHelperBot, a Discord bot that helps programmers.
      Explain the programming concept of "${concept}" in a clear, concise way.
      
      Guidelines:
      - Keep your explanation brief (3-5 short paragraphs maximum)
      - Include simple examples if applicable
      - Format code examples using appropriate markdown for Discord: \`\`\`language\ncode\n\`\`\`
      - Focus on practical understanding
      - Avoid unnecessary technical jargon
      - Always respond in English, regardless of the query language
      - Start with a high-level overview, then provide more specific details
    `;

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Error generating explanation:", error);
    throw new Error("Failed to generate explanation");
  }
}

/**
 * Generates a correction for code with errors
 */
export async function generateCodeCorrection(code: string, language: string): Promise<string> {
  try {
    const prompt = `
      You are SourceHelperBot, a Discord bot that helps programmers fix their code.
      
      Here is some ${language} code that has issues or could be improved:
      
      ${code}
      
      Please:
      1. Identify and fix any bugs or errors in the code
      2. Provide a very brief explanation of what was wrong (1-2 sentences)
      3. Output the corrected code in a Discord code block with proper language syntax highlighting
      4. If there are multiple issues, focus on the most critical ones first
      5. Keep your entire response concise (1 paragraph explanation + corrected code)
      6. Always respond in English, regardless of the query language
      7. Don't add unnecessary improvements if the code works correctly, just fix actual issues
      
      Format your response like this:
      [Brief explanation of issues]
      
      [Corrected code in code block with language]
    `;

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    });

    const content = response.choices[0].message.content || "I couldn't correct the code at this time.";
    
    // Ensure the response properly formats the code block if not already formatted
    if (!content.includes("```")) {
      // Find where the explanation ends and code begins
      const lines = content.split("\n");
      let explanationLines = [];
      let codeLines = [];
      let inExplanation = true;
      
      for (const line of lines) {
        if (inExplanation && line.trim() === "") {
          inExplanation = false;
          continue;
        }
        
        if (inExplanation) {
          explanationLines.push(line);
        } else {
          codeLines.push(line);
        }
      }
      
      const explanation = explanationLines.join("\n").trim();
      const correctedCode = codeLines.join("\n").trim();
      
      return `${explanation}\n\n${formatCodeBlock(correctedCode, language)}`;
    }
    
    return content;
  } catch (error) {
    console.error("Error generating code correction:", error);
    throw new Error("Failed to generate code correction");
  }
}
