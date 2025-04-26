import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle, ExternalLink, Github } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-discord-tertiary border-b border-github-border px-6 py-3 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-discord-blurple text-2xl font-bold flex items-center">
            <MessageCircle className="h-8 w-8 mr-2" />
            SourceHelperBot
          </Link>
          <span className="px-2 py-1 text-xs rounded-full bg-github-button text-white font-medium">v1.0.0</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className={`text-sm font-medium ${location === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                Home
              </span>
            </Link>
            
            <Link href="/features">
              <span className={`text-sm font-medium ${location === '/features' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                Features
              </span>
            </Link>
            
            <Link href="/docs">
              <span className={`text-sm font-medium ${location === '/docs' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                Documentation
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button className="bg-discord-blurple hover:bg-opacity-80 transition-colors flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Add to Discord
            </Button>
            
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-discord-secondary text-white border-github-border">
              <div className="flex flex-col space-y-6 mt-6">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <span className={`text-base font-medium ${location === '/' ? 'text-white' : 'text-gray-400'}`}>
                    Home
                  </span>
                </Link>
                
                <Link href="/features" onClick={() => setIsOpen(false)}>
                  <span className={`text-base font-medium ${location === '/features' ? 'text-white' : 'text-gray-400'}`}>
                    Features
                  </span>
                </Link>
                
                <Link href="/docs" onClick={() => setIsOpen(false)}>
                  <span className={`text-base font-medium ${location === '/docs' ? 'text-white' : 'text-gray-400'}`}>
                    Documentation
                  </span>
                </Link>
                
                <div className="pt-4 mt-4 border-t border-github-border">
                  <Button className="w-full bg-discord-blurple hover:bg-opacity-80 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Add to Discord
                  </Button>
                  
                  <a 
                    href="#" 
                    className="mt-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub Repository
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
