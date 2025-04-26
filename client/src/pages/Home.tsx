import { Link } from "wouter";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import DiscordChatSimulator from "@/components/DiscordChatSimulator";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Code,
  Zap,
  Languages,
  Github,
  ExternalLink
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-github-dark text-gray-100">
      <Hero />

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              icon={<MessageCircle className="h-6 w-6" />}
              title="Automatic Question Detection"
              description="Identifies programming questions without explicit commands"
              color="blurple"
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Concept Explanations"
              description="Clear, concise explanations for programming concepts"
              color="green"
            />
            <FeatureCard 
              icon={<Code className="h-6 w-6" />}
              title="Code Correction"
              description="Finds and fixes bugs in shared code snippets"
              color="yellow"
            />
            <FeatureCard 
              icon={<Languages className="h-6 w-6" />}
              title="Multi-language Support"
              description="Responds in English to queries in any language"
              color="red"
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4 bg-discord-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">See SourceHelperBot in Action</h2>
          <p className="text-xl text-center text-gray-400 mb-8">
            Watch how SourceHelperBot automatically helps users with programming questions
          </p>

          <DiscordChatSimulator />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-discord-blurple">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to enhance your Discord server?</h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Add SourceHelperBot to your server and start helping your community with programming questions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-white text-discord-blurple hover:bg-opacity-90 font-medium"
              size="lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Add to Discord
            </Button>
            <Button 
              variant="outline" 
              className="border-github-border hover:bg-github-dark" 
              size="lg"
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
