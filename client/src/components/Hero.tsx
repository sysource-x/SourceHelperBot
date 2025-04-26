import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-discord-tertiary to-github-dark">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-discord-blurple to-discord-green bg-clip-text text-transparent">
          SourceHelperBot
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          A Discord bot that automatically detects programming questions
          and provides concise explanations and code corrections
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            className="bg-discord-blurple hover:bg-opacity-80 font-medium"
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-discord-primary p-6 rounded-lg border border-github-border">
            <h3 className="text-xl font-semibold mb-2">Automatic Detection</h3>
            <p className="text-gray-400">
              No need for explicit commands – SourceHelperBot identifies programming questions automatically
            </p>
          </div>
          
          <div className="bg-discord-primary p-6 rounded-lg border border-github-border">
            <h3 className="text-xl font-semibold mb-2">Multi-language</h3>
            <p className="text-gray-400">
              Supports multiple programming languages and input languages
            </p>
          </div>
          
          <div className="bg-discord-primary p-6 rounded-lg border border-github-border">
            <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
            <p className="text-gray-400">
              Simple installation and configuration for your Discord server
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <Link href="/docs">
            <Button variant="ghost" className="text-discord-blurple hover:text-discord-blurple hover:bg-discord-blurple/10">
              Read the documentation →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
