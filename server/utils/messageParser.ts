/**
 * Analyzes messages to determine if they're programming questions
 */

interface AnalysisResult {
  isProgrammingQuestion: boolean;
  confidence: number;
  concept?: string;
  language?: string;
}

// Programming related keywords and phrases
const PROGRAMMING_KEYWORDS = [
  'code', 'function', 'error', 'bug', 'debug', 'syntax', 'compiler',
  'variable', 'array', 'object', 'class', 'method', 'property',
  'javascript', 'python', 'java', 'c++', 'typescript', 'ruby', 'php',
  'golang', 'rust', 'swift', 'kotlin', 'c#', '.net', 'react', 'angular',
  'vue', 'node', 'express', 'django', 'flask', 'spring', 'api', 'rest',
  'graphql', 'sql', 'database', 'query', 'json', 'xml', 'html', 'css',
  'http', 'request', 'response', 'exception', 'try', 'catch', 'throw',
  'async', 'await', 'promise', 'callback', 'frontend', 'backend',
  'fullstack', 'algorithm', 'data structure', 'github', 'git', 'commit',
  'branch', 'merge', 'pull request', 'docker', 'kubernetes', 'deploy',
  'server', 'client', 'framework', 'library'
];

// Question indicators in multiple languages
const QUESTION_INDICATORS = {
  english: ['how', 'why', 'what', 'when', 'where', 'who', 'which', 'can', 'could', 'help', '?'],
  spanish: ['cómo', 'por qué', 'qué', 'cuándo', 'dónde', 'quién', 'cuál', 'puedo', 'podría', 'ayuda'],
  portuguese: ['como', 'por que', 'o que', 'quando', 'onde', 'quem', 'qual', 'posso', 'poderia', 'ajuda'],
  french: ['comment', 'pourquoi', 'quoi', 'quand', 'où', 'qui', 'quel', 'puis-je', 'pourrait', 'aide'],
  german: ['wie', 'warum', 'was', 'wann', 'wo', 'wer', 'welche', 'kann', 'könnte', 'hilfe'],
};

// Problem indicators
const PROBLEM_INDICATORS = [
  'not working', 'doesn\'t work', 'error', 'exception', 'bug', 'issue',
  'problem', 'wrong', 'incorrect', 'fail', 'failing', 'crashed', 'stuck',
  'help', 'fix', 'debug', 'trouble', 'struggling', 'confused'
];

/**
 * Analyzes a message to determine if it's a programming question
 */
export function analyzeMessage(message: string): AnalysisResult {
  const lowerMessage = message.toLowerCase();
  let score = 0;
  let maxScore = 0;
  let detectedConcept: string | undefined;
  
  // Check for programming keywords
  for (const keyword of PROGRAMMING_KEYWORDS) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      score += 1;
      
      // Try to determine the concept being asked about
      const keywordIndex = lowerMessage.indexOf(keyword.toLowerCase());
      if (keywordIndex !== -1) {
        // Extract a potential concept phrase (keyword and surrounding words)
        const startIndex = Math.max(0, lowerMessage.lastIndexOf(' ', keywordIndex) - 20);
        const endIndex = Math.min(lowerMessage.length, lowerMessage.indexOf(' ', keywordIndex + keyword.length) + 20);
        if (!detectedConcept) {
          detectedConcept = message.substring(startIndex, endIndex).trim();
        }
      }
    }
  }
  maxScore += PROGRAMMING_KEYWORDS.length;
  
  // Check for question indicators in various languages
  let hasQuestionIndicator = false;
  for (const [language, indicators] of Object.entries(QUESTION_INDICATORS)) {
    for (const indicator of indicators) {
      if (lowerMessage.includes(indicator.toLowerCase())) {
        hasQuestionIndicator = true;
        score += 2; // Weight questions higher
        break;
      }
    }
    if (hasQuestionIndicator) break;
  }
  maxScore += 2;
  
  // Check for problem indicators
  let hasProblemIndicator = false;
  for (const indicator of PROBLEM_INDICATORS) {
    if (lowerMessage.includes(indicator.toLowerCase())) {
      hasProblemIndicator = true;
      score += 2; // Weight problems higher
      break;
    }
  }
  maxScore += 2;
  
  // Special case for question marks
  if (message.includes('?')) {
    hasQuestionIndicator = true;
    score += 1;
  }
  maxScore += 1;
  
  // Calculate confidence
  const confidence = maxScore > 0 ? score / maxScore : 0;
  
  // Message is considered a programming question if:
  // 1. It contains programming keywords
  // 2. And it has either a question indicator or a problem indicator
  // 3. And the confidence is above threshold
  const isProgrammingQuestion = 
    score > 0 && 
    (hasQuestionIndicator || hasProblemIndicator) &&
    confidence > 0.3;
  
  return {
    isProgrammingQuestion,
    confidence,
    concept: detectedConcept,
  };
}
