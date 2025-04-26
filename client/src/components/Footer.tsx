import { Link } from "wouter";
import { MessageCircle, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-discord-tertiary text-gray-400 py-6 border-t border-github-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 text-discord-blurple mr-2" />
              <span className="text-white font-medium">SourceHelperBot</span>
            </div>
            <p className="text-sm mt-2">Automated programming assistance for your Discord community</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-github-border flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/">
              <span className="text-sm hover:text-white cursor-pointer">Home</span>
            </Link>
            <Link href="/features">
              <span className="text-sm hover:text-white cursor-pointer">Features</span>
            </Link>
            <Link href="/docs">
              <span className="text-sm hover:text-white cursor-pointer">Documentation</span>
            </Link>
          </div>
          
          <div className="text-center text-sm">
            &copy; {new Date().getFullYear()} SourceHelperBot. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
