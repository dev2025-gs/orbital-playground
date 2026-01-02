import { Home, Rocket, GraduationCap, Settings, Orbit } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Rocket, label: "Sandbox", path: "/sandbox" },
  { icon: Orbit, label: "Maneuver", path: "/maneuver" },
  { icon: GraduationCap, label: "Academy", path: "/academy" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen glass-panel border-r border-border/50">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border/50">
        <div className="relative">
          <Orbit className="h-10 w-10 text-primary animate-orbit" />
          <div className="absolute inset-0 blur-lg bg-primary/30" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold orbital-gradient">APSIS</h1>
          <p className="text-xs text-muted-foreground tracking-widest">ORBITAL MECHANICS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sideNavIndicator"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon
                className={cn(
                  "h-5 w-5 relative z-10 transition-all duration-300",
                  isActive && "text-glow-cyan"
                )}
              />
              <span className="relative z-10 font-display text-sm tracking-wide">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_10px_hsl(var(--primary))]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-border/50">
        <div className="glass-panel p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-display">SYSTEM STATUS</span>
          </div>
          <p className="text-sm text-primary font-mono">OPERATIONAL</p>
        </div>
      </div>
    </aside>
  );
}
