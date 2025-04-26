import { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";
import { MessageCircle } from "lucide-react";

interface Message {
  id: string;
  author: {
    name: string;
    avatar: string;
    color?: string;
  };
  content: string;
  time: string;
  isBot: boolean;
}

export default function DiscordChatSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Sample conversation - in a real app, this would come from an API
    const sampleConversation: Message[] = [
      {
        id: "1",
        author: {
          name: "DevKid",
          avatar: "DK",
          color: "discord-green"
        },
        content: "Como posso fazer uma função em JavaScript para ordenar um array de objetos por uma propriedade específica?",
        time: "Today at 2:30 PM",
        isBot: false
      },
      {
        id: "2",
        author: {
          name: "SourceHelperBot",
          avatar: "",
          color: "discord-blurple"
        },
        content: `To sort an array of objects by a specific property in JavaScript, you can use the \`sort()\` method with a compare function:

\`\`\`javascript
function sortByProperty(array, property) {
  return array.sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
  });
}

// Example usage:
const users = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 }
];

sortByProperty(users, "age");
// Result: users sorted by age (ascending)
\`\`\`

You can also do this more concisely using arrow functions:

\`\`\`javascript
users.sort((a, b) => a.age - b.age); // For numeric properties
users.sort((a, b) => a.name.localeCompare(b.name)); // For string properties
\`\`\``,
        time: "Today at 2:31 PM",
        isBot: true
      },
      {
        id: "3",
        author: {
          name: "JavaScripter",
          avatar: "JS",
          color: "yellow-400"
        },
        content: `I have this code but it's not working, can anyone help?
\`\`\`javascript
function fetchUserData() {
  const data = fetch('https://api.example.com/users')
  data.then(response => {
    return response.json()
  })
  
  return data // This returns a promise, not the actual data
}
\`\`\``,
        time: "Today at 2:40 PM",
        isBot: false
      },
      {
        id: "4",
        author: {
          name: "SourceHelperBot",
          avatar: "",
          color: "discord-blurple"
        },
        content: `Your code is not working because you're returning a Promise without properly handling the asynchronous nature of \`fetch()\`. Here's the corrected version:

\`\`\`javascript
// Option 1: Using async/await (recommended)
async function fetchUserData() {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Option 2: Using Promise chain
function fetchUserData() {
  return fetch('https://api.example.com/users')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}
\`\`\`

Remember that both implementations still return a Promise, so you need to use \`then()\` or \`await\` when calling these functions.`,
        time: "Today at 2:42 PM",
        isBot: true
      }
    ];

    setMessages(sampleConversation);
  }, []);

  return (
    <div className="bg-discord-primary rounded-lg border border-github-border overflow-hidden">
      <div className="bg-discord-tertiary px-4 py-3 flex items-center border-b border-github-border">
        <MessageCircle className="h-5 w-5 text-discord-blurple mr-2" />
        <span className="font-medium">#programming-help</span>
      </div>
      
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex mb-4">
            <div className="flex-shrink-0 mr-3">
              {message.isBot ? (
                <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
              ) : (
                <div className={`w-10 h-10 rounded-full ${message.author.color ? `bg-${message.author.color}` : 'bg-gray-700'} flex items-center justify-center text-white font-medium`}>
                  {message.author.avatar}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className={`font-medium ${message.author.color ? `text-${message.author.color}` : 'text-white'} mr-2`}>
                  {message.author.name}
                </span>
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>

              <div className="text-sm">
                {/* Parse and render the message content with code blocks */}
                {renderMessageContent(message.content)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 bg-discord-secondary border-t border-github-border">
        <div className="flex items-center">
          <div className="flex-1 bg-discord-tertiary rounded-md px-3 py-2 text-gray-400 text-sm">
            Message #programming-help
          </div>
          <button className="ml-2 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </button>
          <button className="ml-2 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function renderMessageContent(content: string) {
  // Split by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language and code
      const match = part.match(/```([\w+#.-]+)?\n([\s\S]*?)```/);
      if (match) {
        const language = match[1] || 'plaintext';
        const code = match[2];
        return <CodeBlock key={index} language={language} code={code} />;
      }
      return part;
    } else {
      // Handle inline code
      const inlineParts = part.split(/(`[^`]+`)/g);
      return (
        <span key={index}>
          {inlineParts.map((inlinePart, i) => {
            if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
              const code = inlinePart.slice(1, -1);
              return (
                <code key={i} className="bg-discord-tertiary px-1 py-0.5 rounded text-discord-light">
                  {code}
                </code>
              );
            }
            return <span key={i} dangerouslySetInnerHTML={{ __html: inlinePart.replace(/\n/g, '<br />') }} />;
          })}
        </span>
      );
    }
  });
}
