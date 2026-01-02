import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, RotateCcw, Rocket, Target, AlertTriangle } from "lucide-react";

const EARTH_RADIUS = 6371;
const MU = 398600.4418;

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
  const transferTime = Math.PI * Math.sqrt(Math.pow(a, 3) / MU) / 60;

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
      <div className="flex-1 p-4 md:p-8 overflow-auto scanlines">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-secondary" />
            <span className="text-[10px] text-muted-foreground tracking-[0.3em]">TACTICAL CONSOLE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="mcrn-gradient">HOHMANN TRANSFER</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            CALCULATE OPTIMAL TWO-BURN SEQUENCE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="tactical-panel p-6 bracket-frame"
          >
            <h2 className="text-sm font-display font-semibold mb-6 text-primary tracking-widest">
              ORBIT PARAMETERS
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-display text-muted-foreground tracking-widest mb-2 block">
                  INITIAL ALTITUDE (KM)
                </label>
                <Input
                  type="number"
                  value={initialAltitude}
                  onChange={(e) => setInitialAltitude(e.target.value)}
                  placeholder="400"
                />
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  ISS: ~420 KM // LOW EARTH ORBIT
                </p>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
              </div>

              <div>
                <label className="text-[10px] font-display text-muted-foreground tracking-widest mb-2 block">
                  TARGET ALTITUDE (KM)
                </label>
                <Input
                  type="number"
                  value={targetAltitude}
                  onChange={(e) => setTargetAltitude(e.target.value)}
                  placeholder="35786"
                />
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  GEO: 35,786 KM // GEOSTATIONARY
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="roci" onClick={handleCalculate} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  COMPUTE
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
            className="tactical-panel p-6 bracket-frame"
          >
            <h2 className="text-sm font-display font-semibold mb-6 text-secondary tracking-widest">
              BURN SCHEDULE
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
                  {/* Transfer Visualization */}
                  <div className="relative h-28 mb-6">
                    <svg className="w-full h-full" viewBox="0 0 300 90">
                      {/* Grid lines */}
                      <line x1="0" y1="45" x2="300" y2="45" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Initial Orbit */}
                      <circle
                        cx="40"
                        cy="45"
                        r="18"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                      />
                      {/* Transfer Arc */}
                      <path
                        d="M 58 45 Q 150 -10 242 45"
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                        opacity={isAnimating ? 1 : 0.6}
                      />
                      {/* Target Orbit */}
                      <circle
                        cx="260"
                        cy="45"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                      />
                      {/* Burn Points */}
                      <circle cx="58" cy="45" r="5" fill="hsl(var(--primary))" className={isAnimating ? "animate-pulse" : ""} />
                      <circle cx="260" cy="15" r="5" fill="hsl(var(--secondary))" className={isAnimating ? "animate-pulse" : ""} />
                      
                      {/* Labels */}
                      <text x="40" y="80" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle" className="font-mono">ORIGIN</text>
                      <text x="260" y="85" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle" className="font-mono">TARGET</text>
                    </svg>
                  </div>

                  {/* Burn Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="h-3 w-3 text-primary" />
                        <span className="text-[9px] font-display text-muted-foreground tracking-widest">BURN 1</span>
                      </div>
                      <p className="text-xl font-mono font-bold text-primary data-readout">
                        {burnSchedule.deltaV1.toFixed(3)}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">KM/S Δv</p>
                    </div>

                    <div className="stat-card">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="h-3 w-3 text-secondary rotate-180" />
                        <span className="text-[9px] font-display text-muted-foreground tracking-widest">BURN 2</span>
                      </div>
                      <p className="text-xl font-mono font-bold text-secondary data-readout-red">
                        {burnSchedule.deltaV2.toFixed(3)}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">KM/S Δv</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card">
                      <span className="text-[9px] font-display text-muted-foreground tracking-widest">TRANSFER TIME</span>
                      <p className="text-lg font-mono font-bold text-accent data-readout-green">
                        {burnSchedule.transferTime.toFixed(1)}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">MINUTES</p>
                    </div>

                    <div className="stat-card">
                      <span className="text-[9px] font-display text-muted-foreground tracking-widest">TOTAL Δv</span>
                      <p className="text-lg font-mono font-bold text-primary data-readout">
                        {burnSchedule.totalDeltaV.toFixed(3)}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">KM/S</p>
                    </div>
                  </div>

                  <Button variant="mcrn" className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    EXECUTE TRANSFER
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
                  <Rocket className="h-10 w-10 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground text-sm font-mono">
                    ENTER PARAMETERS TO COMPUTE BURN SCHEDULE
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
