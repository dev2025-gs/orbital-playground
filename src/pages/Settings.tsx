import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Volume2, VolumeX, Globe, Palette, Info } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  return (
    <MainLayout>
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="orbital-gradient">Settings</span>
          </h1>
          <p className="text-muted-foreground">
            Customize your orbital mechanics experience
          </p>
        </motion.div>

        <div className="max-w-2xl space-y-6">
          {/* Display Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Display
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">Space Dark theme is optimized for viewing</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                  <Moon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">DARK</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Audio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
              {soundEnabled ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
              Audio
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Engine burns, alerts, and notifications</p>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </motion.div>

          {/* Units Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Units
            </h2>
            <div className="flex gap-3">
              <Button
                variant={units === "metric" ? "prograde" : "glass"}
                onClick={() => setUnits("metric")}
                className="flex-1"
              >
                Metric (km, m/s)
              </Button>
              <Button
                variant={units === "imperial" ? "prograde" : "glass"}
                onClick={() => setUnits("imperial")}
                className="flex-1"
              >
                Imperial (mi, ft/s)
              </Button>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              About
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-mono text-primary">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Build</span>
                <span className="font-mono text-primary">2024.01</span>
              </div>
              <p className="text-sm text-muted-foreground pt-3 border-t border-border">
                Apsis - An educational orbital mechanics playground. 
                Learn about space, orbits, and the physics that govern celestial motion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
