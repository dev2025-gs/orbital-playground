import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, RotateCcw, Rocket } from "lucide-react";

const EARTH_RADIUS = 6371; // km
const MU = 398600.4418; // km³/s² (Earth's gravitational parameter)

interface BurnSchedule {
  deltaV1: number;
  deltaV2: number;
  transferTime: number;
  totalDeltaV: number;
}

function calculateHohmannTransfer(r1: number, r2: number): BurnSchedule {
  const v1 = Math.sqrt(MU / r1);
  const v2 = Math.sqrt(MU / r2);
  const vTransfer1 = Math.sqrt(MU * (2 / r1 - 2 / (r1 + r2)));
  const vTransfer2 = Math.sqrt(MU * (2 / r2 - 2 / (r1 + r2)));
  
  const deltaV1 = Math.abs(vTransfer1 - v1);
  const deltaV2 = Math.abs(v2 - vTransfer2);
  
  const a = (r1 + r2) / 2;
  const transferTime = Math.PI * Math.sqrt(Math.pow(a, 3) / MU) / 60; // minutes

  return {
    deltaV1,
    deltaV2,
    transferTime,
    totalDeltaV: deltaV1 + deltaV2,
  };
}

export default function ManeuverPlanner() {
  const [initialAltitude, setInitialAltitude] = useState("400");
  const [targetAltitude, setTargetAltitude] = useState("35786");
  const [burnSchedule, setBurnSchedule] = useState<BurnSchedule | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCalculate = () => {
    const r1 = EARTH_RADIUS + parseFloat(initialAltitude);
    const r2 = EARTH_RADIUS + parseFloat(targetAltitude);
    const schedule = calculateHohmannTransfer(r1, r2);
    setBurnSchedule(schedule);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const handleReset = () => {
    setBurnSchedule(null);
    setIsAnimating(false);
  };

  return (
    <MainLayout>
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="orbital-gradient">Hohmann Transfer</span>
          </h1>
          <p className="text-muted-foreground">
            Calculate the optimal two-burn maneuver to change orbits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-display font-semibold mb-6 text-primary">
              Orbit Parameters
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-display text-muted-foreground tracking-widest mb-2 block">
                  INITIAL ORBIT ALTITUDE (km)
                </label>
                <Input
                  type="number"
                  value={initialAltitude}
                  onChange={(e) => setInitialAltitude(e.target.value)}
                  className="font-mono"
                  placeholder="400"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ISS: ~420 km, Low Earth Orbit
                </p>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
              </div>

              <div>
                <label className="text-xs font-display text-muted-foreground tracking-widest mb-2 block">
                  TARGET ORBIT ALTITUDE (km)
                </label>
                <Input
                  type="number"
                  value={targetAltitude}
                  onChange={(e) => setTargetAltitude(e.target.value)}
                  className="font-mono"
                  placeholder="35786"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  GEO: 35,786 km, Geostationary Orbit
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="orbital" onClick={handleCalculate} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button variant="ghost" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-display font-semibold mb-6 text-secondary">
              Burn Schedule
            </h2>

            <AnimatePresence mode="wait">
              {burnSchedule ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  {/* Visual Representation */}
                  <div className="relative h-32 mb-8">
                    <svg className="w-full h-full" viewBox="0 0 300 100">
                      {/* Initial Orbit */}
                      <circle
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeDasharray={isAnimating ? "0 100" : "100 0"}
                        className="transition-all duration-1000"
                      />
                      {/* Transfer Ellipse */}
                      <ellipse
                        cx="150"
                        cy="50"
                        rx="100"
                        ry="30"
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                        opacity={isAnimating ? 1 : 0.5}
                        className="transition-opacity duration-500"
                      />
                      {/* Target Orbit */}
                      <circle
                        cx="250"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                      />
                      {/* Burn Points */}
                      <circle cx="70" cy="50" r="5" fill="hsl(var(--primary))" className={isAnimating ? "animate-pulse" : ""} />
                      <circle cx="250" cy="15" r="5" fill="hsl(var(--secondary))" className={isAnimating ? "animate-pulse" : ""} />
                      
                      {/* Labels */}
                      <text x="50" y="85" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Initial</text>
                      <text x="250" y="95" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Target</text>
                    </svg>
                  </div>

                  {/* Burn Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="stat-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="h-4 w-4 text-primary" />
                        <span className="text-xs font-display text-muted-foreground">BURN 1</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-primary data-readout">
                        {burnSchedule.deltaV1.toFixed(3)}
                      </p>
                      <p className="text-xs text-muted-foreground">km/s Δv</p>
                    </div>

                    <div className="stat-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="h-4 w-4 text-secondary rotate-180" />
                        <span className="text-xs font-display text-muted-foreground">BURN 2</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-secondary data-readout">
                        {burnSchedule.deltaV2.toFixed(3)}
                      </p>
                      <p className="text-xs text-muted-foreground">km/s Δv</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="stat-card">
                      <span className="text-xs font-display text-muted-foreground">TRANSFER TIME</span>
                      <p className="text-xl font-mono font-bold text-accent data-readout">
                        {burnSchedule.transferTime.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">minutes</p>
                    </div>

                    <div className="stat-card">
                      <span className="text-xs font-display text-muted-foreground">TOTAL Δv</span>
                      <p className="text-xl font-mono font-bold text-primary data-readout">
                        {burnSchedule.totalDeltaV.toFixed(3)}
                      </p>
                      <p className="text-xs text-muted-foreground">km/s</p>
                    </div>
                  </div>

                  <Button variant="prograde" className="w-full">
                    Execute Transfer
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <Rocket className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Enter orbit parameters and click Calculate to see the burn schedule
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
