export default function AdvancedFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
        <h3 className="text-xl font-semibold mb-3">Language Detection</h3>
        <p className="text-gray-400 mb-4">SourceHelperBot automatically detects the programming language in code blocks:</p>
        
        <div className="bg-code-bg rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-white">
{`// Example language detection logic
function detectLanguage(code) {
  const patterns = {
    javascript: /var|const|let|function|\\$\\(/i,
    python: /def\\s+\\w+\\s*\\(|import\\s+\\w+|from\\s+\\w+\\s+import/i,
    java: /public\\s+class|private\\s+\\w+|protected\\s+\\w+/i,
    html: /<!DOCTYPE|<html|<body|<div/i,
    css: /\\w+\\s*{\\s*\\w+-\\w+:/i,
    sql: /SELECT|INSERT|UPDATE|DELETE|CREATE TABLE/i
  };

  for (const [language, pattern] of Object.entries(patterns)) {
    if (pattern.test(code)) {
      return language;
    }
  }
  
  return 'unknown';
}`}
          </pre>
        </div>
      </div>
      
      <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
        <h3 className="text-xl font-semibold mb-3">Message Filtering</h3>
        <p className="text-gray-400 mb-4">Optimize performance by filtering messages before processing:</p>
        
        <div className="bg-code-bg rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-white">
{`// Example message filtering logic
function shouldProcessMessage(message) {
  // Ignore bot messages
  if (message.author.bot) return false;
  
  // Check if message is in a programming channel
  const programmingChannels = [
    'programming', 'code-help', 'dev'
  ];
  const channelName = message.channel.name.toLowerCase();
  const inProgrammingChannel = programmingChannels.some(
    name => channelName.includes(name)
  );
  
  // Check for programming question indicators
  const questionIndicators = [
    'how do i', 'how to', 'help with',
    'error', 'not working', 'bug',
    'como', 'ayuda', 'como fazer'
  ];
  const content = message.content.toLowerCase();
  const hasQuestionIndicator = questionIndicators.some(
    indicator => content.includes(indicator)
  );
  
  // Check for code blocks
  const hasCodeBlock = message.content.includes('\`\`\`');
  
  return inProgrammingChannel && 
         (hasQuestionIndicator || hasCodeBlock);
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
