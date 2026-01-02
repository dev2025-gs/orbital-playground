import { Home, Rocket, GraduationCap, Settings, Orbit, Crosshair } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "CIC", path: "/" },
  { icon: Rocket, label: "NAV", path: "/sandbox" },
  { icon: Crosshair, label: "TAC", path: "/maneuver" },
  { icon: GraduationCap, label: "DATA", path: "/academy" },
  { icon: Settings, label: "SYS", path: "/settings" },
];

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen tactical-panel border-r border-border/50">
      {/* Faction Color Bar */}
      <div className="header-bar" />
      
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border/50">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-primary rounded-sm flex items-center justify-center">
            <Orbit className="h-6 w-6 text-primary animate-orbit" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary roci-glow tracking-widest">APSIS</h1>
          <p className="text-[10px] text-muted-foreground tracking-[0.3em]">ROCINANTE TACTICAL</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] text-muted-foreground tracking-[0.2em] mb-3 px-2">NAVIGATION</p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 group",
                isActive
                  ? "text-primary bg-primary/10 border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-l-2 border-transparent"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isActive && "text-glow-amber"
                )}
              />
              <span className="font-display text-sm tracking-widest">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 8px hsl(var(--primary))" }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Status Panel */}
      <div className="p-4 border-t border-border/50">
        <div className="tactical-panel p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground tracking-[0.2em]">DRIVE STATUS</span>
            <div className="status-indicator status-nominal" />
          </div>
          <p className="text-sm font-mono text-accent data-readout-green">EPSTEIN NOMINAL</p>
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-accent to-opa-dim" />
          </div>
        </div>
      </div>
    </aside>
  );
}
