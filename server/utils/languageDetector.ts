/**
 * Detects programming language from code snippets
 */

interface LanguagePattern {
  language: string;
  patterns: RegExp[];
  fileExtensions?: string[];
  keywords?: string[];
}

// Language detection patterns
const languagePatterns: LanguagePattern[] = [
  {
    language: 'javascript',
    patterns: [
      /\bconst\b|\blet\b|\bvar\b|\bfunction\b|\breturn\b|\bconsole\.log\b|\bdocument\b|\bwindow\b|\brequire\b|\bmodule\.exports\b/i,
      /\$\(.*\)|\bawait\b|\basync\b|\bnew Promise\b/i
    ],
    fileExtensions: ['.js', '.jsx', '.mjs'],
    keywords: ['javascript', 'js', 'node', 'nodejs', 'react', 'vue', 'angular']
  },
  {
    language: 'typescript',
    patterns: [
      /\binterface\b|\btype\b|\bnamespace\b|\bclass\b.*\bimplements\b|\bas\b|\benum\b/i,
      /:\s*(string|number|boolean|any|unknown|void|never)/i
    ],
    fileExtensions: ['.ts', '.tsx'],
    keywords: ['typescript', 'ts']
  },
  {
    language: 'python',
    patterns: [
      /\bdef\b|\bclass\b|\bimport\b|\bfrom\b.*\bimport\b|\bprint\b\(/i,
      /\bif\b.*:|\bfor\b.*:|\bwhile\b.*:|\btry\b:|^\s*#\s/m
    ],
    fileExtensions: ['.py'],
    keywords: ['python', 'py', 'django', 'flask']
  },
  {
    language: 'java',
    patterns: [
      /\bpublic\b|\bprivate\b|\bprotected\b|\bclass\b|\binterface\b|\benum\b/i,
      /\bextends\b|\bimplements\b|\bSystem\.out\b|\bthrows\b|\bnew \w+\(/i
    ],
    fileExtensions: ['.java'],
    keywords: ['java', 'spring', 'android']
  },
  {
    language: 'csharp',
    patterns: [
      /\busing\b.*?;|\bnamespace\b|\bclass\b|\bpublic\b|\bprivate\b|\bprotected\b/i,
      /\bConsole\.Write/i
    ],
    fileExtensions: ['.cs'],
    keywords: ['c#', 'csharp', '.net', 'dotnet', 'asp.net']
  },
  {
    language: 'php',
    patterns: [
      /\<\?php|\bfunction\b|\becho\b|\bforeach\b|\b\$[a-zA-Z_]/i,
      /\-\>|::/
    ],
    fileExtensions: ['.php'],
    keywords: ['php', 'laravel', 'symfony']
  },
  {
    language: 'html',
    patterns: [
      /\<!DOCTYPE\s+html\>|\<html\>|\<head\>|\<body\>|\<div\>|\<span\>|\<a\s+href/i,
      /\<\/[\w]+\>/i
    ],
    fileExtensions: ['.html', '.htm'],
    keywords: ['html', 'markup']
  },
  {
    language: 'css',
    patterns: [
      /[\.\#\w]+\s*\{[\s\S]*?\}/i,
      /\b(margin|padding|border|font|background|color|display|position)\s*:/i
    ],
    fileExtensions: ['.css'],
    keywords: ['css', 'styles', 'stylesheet']
  },
  {
    language: 'sql',
    patterns: [
      /\bSELECT\b.*\bFROM\b|\bINSERT INTO\b|\bUPDATE\b.*\bSET\b|\bDELETE FROM\b/i,
      /\bWHERE\b|\bGROUP BY\b|\bORDER BY\b|\bJOIN\b/i
    ],
    fileExtensions: ['.sql'],
    keywords: ['sql', 'mysql', 'postgresql', 'postgres', 'database', 'query']
  },
  {
    language: 'go',
    patterns: [
      /\bpackage\b|\bfunc\b|\bimport\b\s*\(|\bstruct\b|\binterface\b/i,
      /\bgo\b|\bchan\b|\bdefer\b|\bgo\b/i
    ],
    fileExtensions: ['.go'],
    keywords: ['golang', 'go']
  },
  {
    language: 'ruby',
    patterns: [
      /\bdef\b|\bclass\b|\bmodule\b|\brequire\b|\binclude\b/i,
      /\bend\b|\bdo\b|\|.*\|/i
    ],
    fileExtensions: ['.rb'],
    keywords: ['ruby', 'rails']
  },
  {
    language: 'rust',
    patterns: [
      /\bfn\b|\blet\b|\bmut\b|\bstruct\b|\bEnum\b|\bimpl\b|\bpub\b/i,
      /\bmatch\b|\buse\b|\bmod\b/i
    ],
    fileExtensions: ['.rs'],
    keywords: ['rust', 'cargo']
  },
  {
    language: 'kotlin',
    patterns: [
      /\bfun\b|\bval\b|\bvar\b|\bclass\b|\binterface\b|\bobject\b/i,
      /\bunion\b|\bdata class\b/i
    ],
    fileExtensions: ['.kt', '.kts'],
    keywords: ['kotlin', 'android']
  },
  {
    language: 'swift',
    patterns: [
      /\bfunc\b|\bvar\b|\blet\b|\bclass\b|\bstruct\b|\benum\b|\bprotocol\b/i,
      /\bguard\b|\bif let\b|\bUIKit\b|\bSwiftUI\b/i
    ],
    fileExtensions: ['.swift'],
    keywords: ['swift', 'ios', 'macos']
  },
  {
    language: 'bash',
    patterns: [
      /\becho\b|\bmkdir\b|\bchmod\b|\bgrep\b|\bsed\b|\bawk\b/i,
      /\bif\b.*\bthen\b|\bfor\b.*\bdo\b|\bwhile\b.*\bdo\b/i
    ],
    fileExtensions: ['.sh', '.bash'],
    keywords: ['bash', 'shell', 'sh', 'command', 'terminal']
  }
];

/**
 * Detects the programming language of a code snippet
 */
export function detectProgrammingLanguage(code: string): string {
  if (!code || code.trim().length === 0) {
    return 'plaintext';
  }
  
  const cleanedCode = code.trim();
  
  // Score for each language
  const scores: Record<string, number> = {};
  
  // Initialize scores
  languagePatterns.forEach(lang => {
    scores[lang.language] = 0;
  });
  
  // Check each language pattern
  for (const langPattern of languagePatterns) {
    // Test against regex patterns
    for (const pattern of langPattern.patterns) {
      if (pattern.test(cleanedCode)) {
        scores[langPattern.language] += 2;
      }
    }
    
    // Check for language keywords in the code
    if (langPattern.keywords) {
      for (const keyword of langPattern.keywords) {
        if (cleanedCode.toLowerCase().includes(keyword.toLowerCase())) {
          scores[langPattern.language] += 1;
        }
      }
    }
  }
  
  // Find language with highest score
  let bestMatch = 'plaintext';
  let highestScore = 0;
  
  for (const [language, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      bestMatch = language;
    }
  }
  
  // If no clear match, return plaintext
  return highestScore > 0 ? bestMatch : 'plaintext';
}

/**
 * Returns common file extension for a language
 */
export function getFileExtensionForLanguage(language: string): string {
  const langPattern = languagePatterns.find(lp => lp.language === language);
  
  if (langPattern?.fileExtensions && langPattern.fileExtensions.length > 0) {
    return langPattern.fileExtensions[0];
  }
  
  // Default extensions for common languages
  const defaultExtensions: Record<string, string> = {
    'javascript': '.js',
    'typescript': '.ts',
    'python': '.py',
    'java': '.java',
    'csharp': '.cs',
    'php': '.php',
    'html': '.html',
    'css': '.css',
    'sql': '.sql',
    'go': '.go',
    'ruby': '.rb',
    'rust': '.rs',
    'kotlin': '.kt',
    'swift': '.swift',
    'bash': '.sh',
    'plaintext': '.txt'
  };
  
  return defaultExtensions[language] || '.txt';
}
