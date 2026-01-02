import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { OrbitScene } from "@/components/three/OrbitScene";
import { DataDashboard } from "@/components/sandbox/DataDashboard";
import { OrbitControlPanel } from "@/components/sandbox/OrbitControlPanel";

const EARTH_RADIUS = 6371; // km
const MU = 398600.4418; // km³/s² (Earth's gravitational parameter)

export default function Sandbox() {
  const [deltaV, setDeltaV] = useState(0.5);
  const [baseOrbitRadius, setBaseOrbitRadius] = useState(3);
  const [eccentricity, setEccentricity] = useState(0.2);
  const [is2D, setIs2D] = useState(false);

  // Calculate orbital parameters
  const orbitalParams = useMemo(() => {
    const altitude = (baseOrbitRadius - 1) * 400; // Scale to realistic km
    const semiMajorAxis = EARTH_RADIUS + altitude;
    const velocity = Math.sqrt(MU / semiMajorAxis);
    const period = (2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / MU)) / 60; // minutes
    
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
        {/* Controls Panel - Bottom on mobile, Left on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-80 p-4 md:border-r border-border/50 order-2 md:order-1 space-y-4"
        >
          <div className="md:hidden">
            <h2 className="text-lg font-display font-bold text-primary mb-4">
              Orbit Controls
            </h2>
          </div>
          <div className="hidden md:block mb-6">
            <h2 className="text-xl font-display font-bold orbital-gradient mb-1">
              Orbital Sandbox
            </h2>
            <p className="text-sm text-muted-foreground">
              Adjust Δv and execute burns to modify your orbit
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
        </motion.div>

        {/* 3D View - Top on mobile, Right on desktop */}
        <div className="flex-1 relative order-1 md:order-2 min-h-[50vh] md:min-h-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
          <OrbitScene
            orbitRadius={baseOrbitRadius}
            eccentricity={eccentricity}
            speed={0.3 + deltaV * 0.2}
          />
          
          {/* Overlay Info */}
          <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
            <div className="glass-panel px-3 py-2">
              <p className="text-xs text-muted-foreground font-display">ORBIT TYPE</p>
              <p className="text-sm font-mono text-primary">
                {eccentricity < 0.1 ? "CIRCULAR" : eccentricity < 0.5 ? "ELLIPTICAL" : "HIGHLY ELLIPTICAL"}
              </p>
            </div>
            <div className="glass-panel px-3 py-2">
              <p className="text-xs text-muted-foreground font-display">ECCENTRICITY</p>
              <p className="text-sm font-mono text-secondary data-readout">
                {eccentricity.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
