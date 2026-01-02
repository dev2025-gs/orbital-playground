import { Home, Rocket, GraduationCap, Settings, Crosshair, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { icon: Home, label: "CIC", path: "/" },
    { icon: Rocket, label: "NAV", path: "/sandbox" },
    { icon: Crosshair, label: "TAC", path: "/maneuver" },
    { icon: GraduationCap, label: "DATA", path: "/academy" },
    { icon: User, label: "ABOUT", path: "/about" },
];

export function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 tactical-panel border-t border-border/50 px-2 py-2 md:hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className="relative flex flex-col items-center gap-1 px-4 py-2"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary"
                                    style={{ boxShadow: "0 0 10px hsl(var(--primary))" }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-all duration-200",
                                    isActive ? "text-primary text-glow-amber" : "text-muted-foreground"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-[10px] font-display tracking-widest transition-all duration-200",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
