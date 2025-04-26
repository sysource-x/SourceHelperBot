import { useEffect, useRef } from "react";

interface CodeBlockProps {
  language: string;
  code: string;
}

// Simplified syntax highlighting classes
const syntaxMap: Record<string, RegExp[]> = {
  keyword: [
    /\b(function|return|if|for|while|else|var|const|let|try|catch|throw|class|new|async|await|import|export|from|extends|implements|interface|type|enum|yield|default|break|continue|switch|case|this|typeof|instanceof|null|undefined|true|false|void|do|in|of|get|set|super|with|as|delete|finally|debugger|package|private|protected|public|static|implements|interface|module|namespace|enum|export|import)\b/g,
  ],
  string: [
    /"([^"\\]|\\.)*"/g,
    /'([^'\\]|\\.)*'/g,
    /`([^`\\]|\\.)*`/g,
  ],
  comment: [
    /\/\/.*$/gm,
    /\/\*[\s\S]*?\*\//g,
  ],
  function: [
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\(/g,
  ],
  variable: [
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g,
  ],
};

// Apply syntax highlighting
function applySyntax(code: string): JSX.Element {
  // Prepare the code as HTML with spans
  let html = code;
  
  // Apply syntax highlighting rules
  for (const [className, patterns] of Object.entries(syntaxMap)) {
    for (const pattern of patterns) {
      html = html.replace(pattern, (match) => {
        // Don't highlight if it's already highlighted
        if (match.includes('<span class="code-')) {
          return match;
        }
        
        if (className === 'function') {
          // Extract the function name from the match
          const functionName = match.slice(0, -1);
          return `<span class="code-${className}">${functionName}</span>(`;
        }
        
        return `<span class="code-${className}">${match}</span>`;
      });
    }
  }
  
  // Convert newlines to <br>
  html = html.replace(/\n/g, '<br>');
  
  return <pre className="text-white" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <div className="bg-code-bg rounded-md p-3 font-mono text-xs mb-2 overflow-x-auto">
      {applySyntax(code)}
    </div>
  );
}
