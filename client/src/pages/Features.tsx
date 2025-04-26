import { Zap, Code, MessageCircle, Languages } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import DiscordChatSimulator from "@/components/DiscordChatSimulator";
import AdvancedFeatures from "@/components/AdvancedFeatures";

export default function Features() {
  return (
    <div className="bg-github-dark text-gray-100">
      {/* Hero section */}
      <section className="py-16 px-4 bg-discord-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">SourceHelperBot Features</h1>
          <p className="text-xl text-gray-400">
            Automatic programming assistance for your Discord community
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<MessageCircle className="h-6 w-6" />}
              title="Automatic Question Detection"
              description="SourceHelperBot automatically detects when users are asking programming questions, even without explicit commands. It analyzes message context and responds only when necessary."
              color="blurple"
              expanded
            />
            
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Concept Explanations"
              description="When users ask about programming concepts, the bot provides clear, concise explanations with relevant examples, making complex topics accessible to programmers of all levels."
              color="green"
              expanded
            />
            
            <FeatureCard 
              icon={<Code className="h-6 w-6" />}
              title="Code Correction"
              description="Share code with errors, and SourceHelperBot will identify issues, fix bugs, and explain what was wrong. It supports multiple programming languages and common coding patterns."
              color="yellow"
              expanded
            />
            
            <FeatureCard 
              icon={<Languages className="h-6 w-6" />}
              title="Multi-language Support"
              description="Users can ask questions in their native language, and SourceHelperBot will understand and respond in English. This makes programming help accessible to non-English speakers."
              color="red"
              expanded
            />
          </div>
        </div>
      </section>

      {/* Bot Demo */}
      <section className="py-16 px-4 bg-discord-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Interactive Demo</h2>
          <p className="text-xl text-gray-400 mb-8">
            See how SourceHelperBot interacts with users in your Discord server
          </p>
          
          <DiscordChatSimulator />
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Advanced Features</h2>
          <AdvancedFeatures />
        </div>
      </section>
    </div>
  );
}
