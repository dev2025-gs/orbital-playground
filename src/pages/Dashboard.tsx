import { motion } from "framer-motion";
import { Rocket, ArrowRight, Satellite, Orbit, Globe, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const quickLaunchTiles = [
  {
    icon: Rocket,
    title: "Start New Orbit",
    description: "Configure and launch a new orbital simulation",
    path: "/sandbox",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Target,
    title: "Hohmann Transfer",
    description: "Learn orbital transfer maneuvers step by step",
    path: "/maneuver",
    gradient: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Globe,
    title: "Gravity Well Sim",
    description: "Explore gravitational fields and escape velocity",
    path: "/sandbox",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
];

const recentStats = [
  { label: "Last Orbit Altitude", value: "420 km", change: "+15km" },
  { label: "Total Simulations", value: "24", change: "+3" },
  { label: "Successful Transfers", value: "18", change: "+2" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="orbital-gradient">Mission Control</span>
          </h1>
          <p className="text-muted-foreground">Welcome back, Commander. Your orbital playground awaits.</p>
        </motion.div>

        {/* Featured Mission Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <Satellite className="w-full h-full text-primary animate-float" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-display text-muted-foreground tracking-widest">
                FEATURED MISSION
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-primary mb-2">
              ISS Orbital Tracking
            </h2>
            <p className="text-muted-foreground mb-4 max-w-md">
              The International Space Station orbits at approximately 420 km altitude, 
              completing one orbit every 93 minutes at 7.66 km/s.
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-mono text-primary data-readout">420</p>
                <p className="text-xs text-muted-foreground">km altitude</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono text-secondary data-readout">7.66</p>
                <p className="text-xs text-muted-foreground">km/s velocity</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono text-accent data-readout">93</p>
                <p className="text-xs text-muted-foreground">min period</p>
              </div>
            </div>
            <Button variant="orbital" onClick={() => navigate("/sandbox")}>
              Track ISS <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Quick Launch Tiles */}
        <div className="mb-8">
          <h3 className="text-sm font-display text-muted-foreground tracking-widest mb-4">
            QUICK LAUNCH
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLaunchTiles.map((tile, index) => (
              <motion.button
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => navigate(tile.path)}
                className={`glass-panel p-5 text-left group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tile.gradient} mb-3`}>
                  <tile.icon className={`h-6 w-6 ${tile.iconColor}`} />
                </div>
                <h4 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                  {tile.title}
                </h4>
                <p className="text-sm text-muted-foreground">{tile.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Stats */}
        <div>
          <h3 className="text-sm font-display text-muted-foreground tracking-widest mb-4">
            RECENT ACTIVITY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="stat-card"
              >
                <p className="text-xs text-muted-foreground font-display tracking-wide mb-2">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-primary data-readout">
                    {stat.value}
                  </span>
                  <span className="text-xs text-primary/60">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
