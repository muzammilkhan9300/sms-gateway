import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Send, 
  Inbox, 
  Users, 
  Settings, 
  Menu,
  LogOut,
  Signal
} from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Send, label: "Compose", href: "/compose" },
    { icon: Inbox, label: "History", href: "/history" },
    { icon: Users, label: "Contacts", href: "/contacts" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 backdrop-blur-xl flex-shrink-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Signal className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              GSM Nexus
            </h1>
          </div>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground group-hover:text-white"}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <div className="pt-8 mt-8 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth">
        {/* Header (Mobile Only) */}
        <div className="md:hidden h-16 flex items-center justify-between px-4 border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-40">
          <h1 className="font-bold text-lg">GSM Nexus</h1>
          <button className="p-2 text-white/70">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
