import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { OrbitScene } from "@/components/three/OrbitScene";
import { DataDashboard } from "@/components/sandbox/DataDashboard";
import { OrbitControlPanel } from "@/components/sandbox/OrbitControlPanel";
import { AlertTriangle, Radio } from "lucide-react";

const EARTH_RADIUS = 6371;
const MU = 398600.4418;

export default function Sandbox() {
  const [deltaV, setDeltaV] = useState(0.5);
  const [baseOrbitRadius, setBaseOrbitRadius] = useState(3);
  const [eccentricity, setEccentricity] = useState(0.2);
  const [is2D, setIs2D] = useState(false);

  const orbitalParams = useMemo(() => {
    const altitude = (baseOrbitRadius - 1) * 400;
    const semiMajorAxis = EARTH_RADIUS + altitude;
    const velocity = Math.sqrt(MU / semiMajorAxis);
    const period = (2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / MU)) / 60;
    
    return {
      velocity: velocity,
      altitude: altitude,
      period: period,
      deltaV: deltaV,
    };
  }, [baseOrbitRadius, deltaV]);

  const handlePrograde = () => {
    setBaseOrbitRadius((prev) => Math.min(prev + deltaV * 0.5, 6));
    setEccentricity((prev) => Math.min(prev + deltaV * 0.1, 0.8));
  };

  const handleRetrograde = () => {
    setBaseOrbitRadius((prev) => Math.max(prev - deltaV * 0.5, 2));
    setEccentricity((prev) => Math.max(prev - deltaV * 0.1, 0));
  };

  const handleReset = () => {
    setBaseOrbitRadius(3);
    setEccentricity(0.2);
    setDeltaV(0.5);
  };

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Controls Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-80 p-4 md:border-r border-border/50 order-2 md:order-1 space-y-4"
        >
          <div className="hidden md:block mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Radio className="h-3 w-3 text-accent animate-pulse" />
              <span className="text-[10px] text-muted-foreground tracking-[0.3em]">NAV CONSOLE</span>
            </div>
            <h2 className="text-xl font-display font-bold text-primary roci-glow tracking-wider">
              ORBITAL NAV
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              ADJUST DELTA-V // EXECUTE BURNS
            </p>
          </div>

          <OrbitControlPanel
            deltaV={deltaV}
            onDeltaVChange={setDeltaV}
            onPrograde={handlePrograde}
            onRetrograde={handleRetrograde}
            onReset={handleReset}
            is2D={is2D}
            onToggleView={() => setIs2D(!is2D)}
          />

          <DataDashboard
            velocity={orbitalParams.velocity}
            altitude={orbitalParams.altitude}
            period={orbitalParams.period}
            deltaV={orbitalParams.deltaV}
          />

          {/* Warning Panel */}
          {eccentricity > 0.5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="tactical-panel p-3 border-secondary/50"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-secondary animate-pulse" />
                <span className="text-[10px] text-secondary font-display tracking-widest">
                  HIGH ECCENTRICITY WARNING
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 3D View */}
        <div className="flex-1 relative order-1 md:order-2 min-h-[50vh] md:min-h-0 scanlines">
          <OrbitScene
            orbitRadius={baseOrbitRadius}
            eccentricity={eccentricity}
            speed={0.3 + deltaV * 0.2}
          />
          
          {/* Tactical Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
            <div className="tactical-panel px-3 py-2">
              <p className="text-[9px] text-muted-foreground font-display tracking-widest">ORBIT CLASS</p>
              <p className="text-sm font-mono text-primary data-readout">
                {eccentricity < 0.1 ? "CIRCULAR" : eccentricity < 0.5 ? "ELLIPTICAL" : "HIGHLY ECCENTRIC"}
              </p>
            </div>
            <div className="tactical-panel px-3 py-2">
              <p className="text-[9px] text-muted-foreground font-display tracking-widest">ECCENTRICITY</p>
              <p className="text-sm font-mono text-secondary data-readout-red">
                {eccentricity.toFixed(3)}
              </p>
            </div>
          </div>

          {/* Bottom Status */}
          <div className="absolute bottom-4 left-4 tactical-panel px-3 py-2 pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="status-indicator status-nominal" />
              <span className="text-[9px] text-accent font-mono tracking-wider">TRACKING ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
