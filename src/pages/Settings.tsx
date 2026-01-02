import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Globe, Settings as SettingsIcon, Shield, Radio } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  return (
    <MainLayout>
      <div className="flex-1 p-4 md:p-8 overflow-auto scanlines">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon className="h-4 w-4 text-primary" />
            <span className="text-[10px] text-muted-foreground tracking-[0.3em]">SYSTEM CONFIG</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="orbital-gradient">SETTINGS</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            CONFIGURE SYSTEM PARAMETERS
          </p>
        </motion.div>

        <div className="max-w-2xl space-y-4">
          {/* Audio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="tactical-panel p-5"
          >
            <h2 className="text-sm font-display font-semibold mb-4 flex items-center gap-2 tracking-widest">
              {soundEnabled ? <Volume2 className="h-4 w-4 text-accent" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
              AUDIO SYSTEMS
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-sm tracking-wide">SOUND EFFECTS</p>
                <p className="text-xs text-muted-foreground font-mono">Engine burns, alerts, comms</p>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </motion.div>

          {/* Units Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="tactical-panel p-5"
          >
            <h2 className="text-sm font-display font-semibold mb-4 flex items-center gap-2 tracking-widest">
              <Globe className="h-4 w-4 text-primary" />
              MEASUREMENT UNITS
            </h2>
            <div className="flex gap-2">
              <Button
                variant={units === "metric" ? "prograde" : "tactical"}
                onClick={() => setUnits("metric")}
                className="flex-1 text-xs"
              >
                METRIC (KM, M/S)
              </Button>
              <Button
                variant={units === "imperial" ? "prograde" : "tactical"}
                onClick={() => setUnits("imperial")}
                className="flex-1 text-xs"
              >
                IMPERIAL (MI, FT/S)
              </Button>
            </div>
          </motion.div>

          {/* Ship Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="tactical-panel p-5 bracket-frame"
          >
            <h2 className="text-sm font-display font-semibold mb-4 flex items-center gap-2 tracking-widest">
              <Shield className="h-4 w-4 text-secondary" />
              VESSEL INFORMATION
            </h2>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">DESIGNATION</span>
                <span className="text-primary data-readout">ROCINANTE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CLASS</span>
                <span className="text-secondary data-readout-red">CORVETTE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">REGISTRY</span>
                <span className="text-accent data-readout-green">LEGITIMATE SALVAGE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DRIVE</span>
                <span className="text-primary data-readout">EPSTEIN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SOFTWARE</span>
                <span className="text-muted-foreground">APSIS v1.0.0</span>
              </div>
            </div>
          </motion.div>

          {/* Comms Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="tactical-panel p-5"
          >
            <h2 className="text-sm font-display font-semibold mb-4 flex items-center gap-2 tracking-widest">
              <Radio className="h-4 w-4 text-accent animate-pulse" />
              COMMUNICATIONS
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="status-indicator status-nominal" />
                <span className="text-xs font-mono text-accent">TIGHT-BEAM: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-indicator status-nominal" />
                <span className="text-xs font-mono text-accent">BROADCAST: STANDBY</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-indicator status-warning" />
                <span className="text-xs font-mono text-primary">LADAR: ACTIVE SCAN</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
