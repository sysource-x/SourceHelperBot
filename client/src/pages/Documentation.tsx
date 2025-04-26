import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ImplementationGuide from "@/components/ImplementationGuide";
import ProjectStructure from "@/components/ProjectStructure";
import { Separator } from "@/components/ui/separator";

type Section = 'introduction' | 'installation' | 'features' | 'environment' | 'permissions' | 'language' | 'basic' | 'admin';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState<Section>('features');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-github-dark text-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {activeSection === 'introduction' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Introduction to SourceHelperBot</h1>
                <p className="text-gray-400 text-lg">A powerful Discord bot for programming assistance</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border mb-6">
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot is a Discord bot designed to assist programmers by automatically detecting programming questions
                  and providing concise explanations and code corrections. It's built to be intuitive, helpful, and blend seamlessly
                  into your Discord community.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Core Functionality</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Automatic detection of programming questions</li>
                  <li>Clear explanations of programming concepts</li>
                  <li>Code correction for multiple languages</li>
                  <li>Multi-language input support (responds in English)</li>
                </ul>
              </div>
            </>
          )}

          {activeSection === 'installation' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Installation Guide</h1>
                <p className="text-gray-400 text-lg">How to add SourceHelperBot to your Discord server</p>
              </header>
              
              <ImplementationGuide />
            </>
          )}

          {activeSection === 'features' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">SourceHelperBot Features</h1>
                <p className="text-gray-400 text-lg">Automatic programming assistance for your Discord community</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border mb-6">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                
                <h3 className="text-xl font-semibold mb-2">Automatic Question Detection</h3>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot uses natural language processing to automatically detect when users are asking programming questions,
                  even without explicitly mentioning the bot. It analyzes message content for programming keywords, question indicators,
                  and code blocks to determine when to respond.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Concept Explanations</h3>
                <p className="text-gray-300 mb-4">
                  When users ask about programming concepts, the bot provides clear, concise explanations with relevant examples.
                  Explanations are designed to be informative yet brief, focusing on practical understanding rather than overwhelming
                  technical details.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Code Correction</h3>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot can identify and fix issues in code snippets. Users simply share their problematic code using
                  Discord's code block format (```code```), and the bot will analyze it, identify errors, and provide a corrected
                  version with a brief explanation of what was wrong.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Multi-language Support</h3>
                <p className="text-gray-300 mb-4">
                  The bot can understand questions asked in various human languages but always responds in English. This makes
                  programming help accessible to non-English speakers while maintaining consistent responses.
                </p>
              </div>
              
              <ProjectStructure />
            </>
          )}

          {activeSection === 'environment' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Environment Setup</h1>
                <p className="text-gray-400 text-lg">Configuring your environment for SourceHelperBot</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
                <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot requires the following environment variables to function properly:
                </p>
                
                <div className="bg-code-bg rounded-md p-4 font-mono text-sm mb-6">
                  <p className="text-code-comment mb-1"># Required Environment Variables</p>
                  <p className="text-code-variable">DISCORD_TOKEN=<span className="text-code-string">your_discord_bot_token</span></p>
                  <p className="text-code-variable">OPENAI_API_KEY=<span className="text-code-string">your_openai_api_key</span></p>
                  <p className="text-code-comment mt-4"># Optional Environment Variables</p>
                  <p className="text-code-variable">PREFIX=<span className="text-code-string">!</span> <span className="text-code-comment"># Default command prefix</span></p>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Getting API Keys</h3>
                
                <h4 className="text-lg font-medium mt-4 mb-2">Discord Token</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-4">
                  <li>Go to the <a href="https://discord.com/developers/applications" className="text-discord-blurple hover:underline">Discord Developer Portal</a></li>
                  <li>Create a new application or select an existing one</li>
                  <li>Navigate to the "Bot" tab and click "Add Bot"</li>
                  <li>Under the "Token" section, click "Copy" or "Reset Token" to get your bot token</li>
                </ol>
                
                <h4 className="text-lg font-medium mt-4 mb-2">OpenAI API Key</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-4">
                  <li>Visit the <a href="https://platform.openai.com/account/api-keys" className="text-discord-blurple hover:underline">OpenAI API Keys page</a></li>
                  <li>Create an account if you don't have one</li>
                  <li>Generate a new API key</li>
                  <li>Copy the API key (it will only be shown once)</li>
                </ol>
              </div>
            </>
          )}

          {activeSection === 'permissions' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Bot Permissions</h1>
                <p className="text-gray-400 text-lg">Required permissions for SourceHelperBot</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
                <h2 className="text-2xl font-semibold mb-4">Discord Permissions</h2>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot requires the following permissions to function properly in your Discord server:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Text Permissions</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Read Messages/View Channels</li>
                      <li>Send Messages</li>
                      <li>Embed Links</li>
                      <li>Attach Files</li>
                      <li>Read Message History</li>
                      <li>Use External Emojis</li>
                      <li>Add Reactions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Application Commands</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Use Slash Commands</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Invitation Link</h3>
                <p className="text-gray-300 mb-4">
                  You can use the following link format to invite SourceHelperBot to your server with the correct permissions:
                </p>
                
                <div className="bg-code-bg rounded-md p-4 font-mono text-sm overflow-x-auto">
                  <p className="text-code-string">https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=274878295104&scope=bot%20applications.commands</p>
                </div>
                
                <p className="text-gray-300 mt-4">
                  Replace <code className="bg-discord-tertiary px-1 py-0.5 rounded">YOUR_CLIENT_ID</code> with your bot's client ID from the Discord Developer Portal.
                </p>
              </div>
            </>
          )}

          {activeSection === 'language' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Language Settings</h1>
                <p className="text-gray-400 text-lg">Language detection and response configuration</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
                <h2 className="text-2xl font-semibold mb-4">Language Detection</h2>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot can detect questions in multiple languages, but always responds in English.
                  The bot supports processing questions in the following languages:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>English</li>
                      <li>Spanish</li>
                      <li>Portuguese</li>
                      <li>French</li>
                      <li>German</li>
                    </ul>
                  </div>
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Italian</li>
                      <li>Dutch</li>
                      <li>Russian</li>
                      <li>Chinese</li>
                      <li>Japanese</li>
                    </ul>
                  </div>
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Korean</li>
                      <li>Arabic</li>
                      <li>Hindi</li>
                      <li>Turkish</li>
                      <li>And more...</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Programming Languages</h3>
                <p className="text-gray-300 mb-4">
                  The bot can detect and provide help for the following programming languages:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>JavaScript</li>
                      <li>TypeScript</li>
                      <li>Python</li>
                      <li>Java</li>
                    </ul>
                  </div>
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>C#</li>
                      <li>PHP</li>
                      <li>Ruby</li>
                      <li>Go</li>
                    </ul>
                  </div>
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Swift</li>
                      <li>Kotlin</li>
                      <li>Rust</li>
                      <li>C/C++</li>
                    </ul>
                  </div>
                  <div className="bg-discord-secondary p-4 rounded-md">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>HTML/CSS</li>
                      <li>SQL</li>
                      <li>Bash/Shell</li>
                      <li>And more...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'basic' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Basic Commands</h1>
                <p className="text-gray-400 text-lg">Essential commands for SourceHelperBot</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
                <h2 className="text-2xl font-semibold mb-4">Command Reference</h2>
                <p className="text-gray-300 mb-4">
                  SourceHelperBot supports the following commands (using the default prefix "!"):
                </p>
                
                <div className="space-y-6">
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!help</code>
                        <span className="ml-4 text-gray-300">Display help information</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Shows a list of available commands and basic usage information.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!help</code></p>
                    </div>
                  </div>
                  
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!explain [concept]</code>
                        <span className="ml-4 text-gray-300">Explain a programming concept</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Provides a concise explanation of the specified programming concept.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!explain javascript closures</code></p>
                    </div>
                  </div>
                  
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!fix</code>
                        <span className="ml-4 text-gray-300">Fix code in your message</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Identifies issues in code and provides corrections. Include code in your message using Discord's code block syntax (```code```).</p>
                      <p className="mt-2"><strong>Example:</strong></p>
                      <pre className="bg-discord-tertiary p-2 rounded mt-1 overflow-x-auto">
                        !fix<br/>
                        ```javascript<br/>
                        function add(a, b) {"{"}<br/>
                          return a + b;<br/>
                        {"}"}<br/>
                        ```
                      </pre>
                    </div>
                  </div>
                  
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!settings</code>
                        <span className="ml-4 text-gray-300">Show current server settings</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Displays the current configuration for the bot in your server.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!settings</code></p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-2">Automatic Detection</h3>
                  <p className="text-gray-300">
                    In addition to explicit commands, SourceHelperBot can automatically detect programming questions
                    and provide help without being directly mentioned. This behavior can be toggled with the <code className="bg-discord-tertiary px-1 py-0.5 rounded">!toggle</code> command.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeSection === 'admin' && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Commands</h1>
                <p className="text-gray-400 text-lg">Administrative commands for SourceHelperBot</p>
              </header>
              
              <div className="bg-discord-primary rounded-lg p-6 border border-github-border">
                <h2 className="text-2xl font-semibold mb-4">Admin Command Reference</h2>
                <p className="text-gray-300 mb-4">
                  These commands are available to users with appropriate permissions:
                </p>
                
                <div className="space-y-6">
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!toggle</code>
                        <span className="ml-4 text-gray-300">Toggle automatic responses</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Toggles whether the bot automatically responds to detected programming questions.</p>
                      <p className="mt-2">When disabled, the bot will only respond to explicit commands.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!toggle</code></p>
                      <p className="mt-2"><strong>Required permissions:</strong> Manage Server</p>
                    </div>
                  </div>
                  
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!prefix [new_prefix]</code>
                        <span className="ml-4 text-gray-300">Change command prefix</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Changes the prefix used for bot commands in your server.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!prefix $</code></p>
                      <p className="mt-2"><strong>Required permissions:</strong> Manage Server</p>
                    </div>
                  </div>
                  
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!stats</code>
                        <span className="ml-4 text-gray-300">View bot usage statistics</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Displays usage statistics for SourceHelperBot in your server.</p>
                      <p className="mt-2">Shows the number of questions answered, code snippets fixed, and concepts explained.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!stats</code></p>
                      <p className="mt-2"><strong>Required permissions:</strong> Manage Server</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-2">Channel Configuration</h3>
                  <p className="text-gray-300 mb-4">
                    You can configure which channels SourceHelperBot will actively monitor:
                  </p>
                  
                  <div className="border border-github-border rounded-md">
                    <div className="bg-discord-secondary p-4 border-b border-github-border">
                      <div className="flex items-center">
                        <code className="bg-discord-tertiary px-2 py-1 rounded text-white font-mono">!channels [add|remove] [#channel]</code>
                        <span className="ml-4 text-gray-300">Configure monitored channels</span>
                      </div>
                    </div>
                    <div className="p-4 text-gray-300 text-sm">
                      <p>Add or remove channels from the bot's monitoring list.</p>
                      <p className="mt-2">By default, the bot monitors all channels it has access to.</p>
                      <p className="mt-2"><strong>Example:</strong> <code className="bg-discord-tertiary px-1 py-0.5 rounded">!channels add #programming-help</code></p>
                      <p className="mt-2"><strong>Required permissions:</strong> Manage Server</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
