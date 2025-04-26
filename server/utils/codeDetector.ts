/**
 * Utility functions for detecting and extracting code blocks from messages
 */

interface CodeBlock {
  code: string;
  language?: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Detects code blocks in a message using Discord's markdown format
 * Discord uses ```language\ncode``` for code blocks
 */
export function detectCode(message: string): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  
  // Regex to match code blocks with or without language specification
  // Group 1: Language (optional)
  // Group 2: Code content
  const codeBlockRegex = /```(?:([\w+#.-]+)?\n)?([\s\S]*?)```/g;
  
  let match;
  while ((match = codeBlockRegex.exec(message)) !== null) {
    const language = match[1]?.trim();
    const code = match[2]?.trim();
    
    if (code) {
      codeBlocks.push({
        code,
        language: language || undefined,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
  }
  
  // If no ``` code blocks, look for inline code with single backticks
  if (codeBlocks.length === 0) {
    const inlineCodeRegex = /`([^`]+)`/g;
    
    while ((match = inlineCodeRegex.exec(message)) !== null) {
      if (match[1]?.trim()) {
        codeBlocks.push({
          code: match[1].trim(),
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    }
  }
  
  return codeBlocks;
}

/**
 * Formats code into a Discord code block with proper language syntax highlighting
 */
export function formatCodeBlock(code: string, language?: string): string {
  return `\`\`\`${language || ''}\n${code}\n\`\`\``;
}

/**
 * Replaces code in a message with corrected code
 */
export function replaceCodeInMessage(message: string, originalCode: string, correctedCode: string): string {
  return message.replace(originalCode, correctedCode);
}
