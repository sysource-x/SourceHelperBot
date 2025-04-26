import { Home, Box, Zap, User, AlertTriangle } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon?: JSX.Element;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const sections: SidebarSection[] = [
    {
      title: "Getting Started",
      items: [
        { id: "introduction", label: "Introduction", icon: <Home className="h-4 w-4 mr-2" /> },
        { id: "installation", label: "Installation", icon: <Box className="h-4 w-4 mr-2" /> },
        { id: "features", label: "Features", icon: <Zap className="h-4 w-4 mr-2" /> }
      ]
    },
    {
      title: "Configuration",
      items: [
        { id: "environment", label: "Environment Setup", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
        { id: "permissions", label: "Bot Permissions", icon: <User className="h-4 w-4 mr-2" /> },
        { id: "language", label: "Language Settings", icon: <AlertTriangle className="h-4 w-4 mr-2" /> }
      ]
    },
    {
      title: "Commands",
      items: [
        { id: "basic", label: "Basic Commands", icon: <Box className="h-4 w-4 mr-2" /> },
        { id: "admin", label: "Admin Commands", icon: <AlertTriangle className="h-4 w-4 mr-2" /> }
      ]
    }
  ];

  return (
    <aside className="w-full md:w-64 bg-discord-secondary border-r border-github-border flex-shrink-0">
      <div className="px-4 py-3 border-b border-github-border">
        <h2 className="text-lg font-medium">Documentation</h2>
        <p className="text-sm text-gray-400">Learn how to use and deploy</p>
      </div>
      
      <nav className="p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center w-full text-left px-2 py-1.5 rounded transition-colors ${
                      activeSection === item.id
                        ? "text-discord-blurple font-medium bg-discord-blurple bg-opacity-20"
                        : "text-gray-300 hover:text-white hover:bg-discord-blurple hover:bg-opacity-20"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
