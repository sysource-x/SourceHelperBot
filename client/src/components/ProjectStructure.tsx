export default function ProjectStructure() {
  return (
    <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
      <h3 className="text-xl font-semibold mb-3">Project Structure</h3>
      
      <div className="bg-code-bg rounded-md p-3 font-mono text-xs mt-2 overflow-x-auto">
        <pre className="text-white">
SourceHelperBot/
├── src/
│   ├── index.js             <span className="text-gray-500">// Entry point</span>
│   ├── bot.js               <span className="text-gray-500">// Bot initialization</span>
│   ├── config.js            <span className="text-gray-500">// Configuration</span>
│   ├── commands/            <span className="text-gray-500">// Command handlers</span>
│   │   ├── help.js
│   │   ├── explain.js
│   │   └── fix.js
│   ├── utils/               <span className="text-gray-500">// Utility functions</span>
│   │   ├── messageParser.js <span className="text-gray-500">// Analyzes messages</span>
│   │   ├── codeDetector.js  <span className="text-gray-500">// Detects code blocks</span>
│   │   └── languageDetector.js
│   └── services/           <span className="text-gray-500">// External services</span>
│       ├── openai.js        <span className="text-gray-500">// OpenAI integration</span>
├── .env                     <span className="text-gray-500">// Environment variables</span>
├── package.json
└── README.md</pre>
      </div>
    </div>
  );
}
