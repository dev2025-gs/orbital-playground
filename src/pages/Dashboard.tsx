import { motion } from "framer-motion";
import { Rocket, ArrowRight, Satellite, Globe, Target, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const quickLaunchTiles = [
  {
    icon: Rocket,
    title: "Launch Simulation",
    description: "Initialize new orbital trajectory",
    path: "/sandbox",
    faction: "roci",
  },
  {
    icon: Target,
    title: "Hohmann Transfer",
    description: "Calculate optimal burn sequence",
    path: "/maneuver",
    faction: "mcrn",
  },
  {
    icon: Globe,
    title: "Gravity Well",
    description: "Escape velocity analysis",
    path: "/sandbox",
    faction: "opa",
  },
];

const recentStats = [
  { label: "Last Orbit Altitude", value: "420", unit: "km", change: "+15km" },
  { label: "Total Burn Time", value: "847", unit: "sec", change: "+124s" },
  { label: "Fuel Remaining", value: "73.4", unit: "%", change: "-2.1%" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex-1 p-4 md:p-8 overflow-auto scanlines">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="status-indicator status-nominal" />
            <span className="text-[10px] text-muted-foreground tracking-[0.3em]">COMBAT INFORMATION CENTER</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="orbital-gradient">ROCINANTE</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">LEGITIMATE SALVAGE // ALL SYSTEMS NOMINAL</p>
        </motion.div>

        {/* Priority Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="tactical-panel p-6 mb-6 relative overflow-hidden bracket-frame"
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <Satellite className="w-full h-full text-primary animate-float" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-primary animate-pulse-glow" />
              <span className="text-[10px] font-display text-primary tracking-[0.3em]">
                PRIORITY TRACK
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-primary roci-glow mb-2 tracking-wider">
              ISS ORBITAL TRACK
            </h2>
            <p className="text-muted-foreground mb-4 max-w-md font-mono text-sm">
              Tracking International Space Station // Low Earth Orbit // 
              Inclination: 51.6° // Completing orbit every 93 minutes
            </p>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="text-center">
                <p className="text-2xl font-mono text-primary data-readout">420</p>
                <p className="text-[10px] text-muted-foreground tracking-widest">ALT (KM)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono text-secondary data-readout-red">7.66</p>
                <p className="text-[10px] text-muted-foreground tracking-widest">VEL (KM/S)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono text-accent data-readout-green">93</p>
                <p className="text-[10px] text-muted-foreground tracking-widest">PERIOD (MIN)</p>
              </div>
            </div>
            <Button variant="roci" onClick={() => navigate("/sandbox")}>
              Initiate Track <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Quick Launch Grid */}
        <div className="mb-8">
          <h3 className="text-[10px] font-display text-muted-foreground tracking-[0.3em] mb-4">
            TACTICAL OPTIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLaunchTiles.map((tile, index) => (
              <motion.button
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => navigate(tile.path)}
                className={`tactical-panel p-5 text-left group transition-all duration-300 hover:border-primary/50`}
              >
                <div className={`inline-flex p-2 rounded-sm mb-3 ${
                  tile.faction === 'roci' ? 'bg-primary/20 text-primary' :
                  tile.faction === 'mcrn' ? 'bg-secondary/20 text-secondary' :
                  'bg-accent/20 text-accent'
                }`}>
                  <tile.icon className="h-5 w-5" />
                </div>
                <h4 className="font-display font-semibold mb-1 tracking-wider group-hover:text-primary transition-colors">
                  {tile.title}
                </h4>
                <p className="text-xs text-muted-foreground font-mono">{tile.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Telemetry */}
        <div>
          <h3 className="text-[10px] font-display text-muted-foreground tracking-[0.3em] mb-4">
            RECENT TELEMETRY
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
                <p className="text-[10px] text-muted-foreground font-display tracking-widest mb-2">
                  {stat.label.toUpperCase()}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-primary data-readout">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{stat.unit}</span>
                  <span className="text-xs text-accent ml-auto font-mono">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
