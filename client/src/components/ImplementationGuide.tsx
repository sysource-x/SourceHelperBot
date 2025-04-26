import CodeBlock from "@/components/CodeBlock";

export default function ImplementationGuide() {
  return (
    <div className="bg-discord-primary rounded-lg p-6 border border-github-border mb-6">
      <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
      <p className="text-gray-400 mb-4">Follow these steps to add SourceHelperBot to your Discord server:</p>
      
      <ol className="list-decimal list-inside space-y-4 text-gray-300">
        <li>
          <span className="font-medium">Clone the repository</span>
          <div className="bg-code-bg rounded-md p-3 font-mono text-xs mt-2 overflow-x-auto">
            <pre className="text-white">git clone https://github.com/yourusername/SourceHelperBot.git
cd SourceHelperBot</pre>
          </div>
        </li>
        
        <li>
          <span className="font-medium">Install dependencies</span>
          <div className="bg-code-bg rounded-md p-3 font-mono text-xs mt-2 overflow-x-auto">
            <pre className="text-white">npm install</pre>
          </div>
        </li>
        
        <li>
          <span className="font-medium">Configure environment variables</span>
          <div className="bg-code-bg rounded-md p-3 font-mono text-xs mt-2 overflow-x-auto">
            <pre className="text-white"># Create a .env file with the following
DISCORD_TOKEN=your_discord_bot_token
OPENAI_API_KEY=your_openai_api_key</pre>
          </div>
        </li>
        
        <li>
          <span className="font-medium">Start the bot</span>
          <div className="bg-code-bg rounded-md p-3 font-mono text-xs mt-2 overflow-x-auto">
            <pre className="text-white">npm start</pre>
          </div>
        </li>
      </ol>
    </div>
  );
}
