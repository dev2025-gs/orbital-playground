import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronUp, ChevronDown, RotateCcw, Eye, Crosshair } from "lucide-react";

interface OrbitControlsProps {
  deltaV: number;
  onDeltaVChange: (value: number) => void;
  onPrograde: () => void;
  onRetrograde: () => void;
  onReset: () => void;
  is2D: boolean;
  onToggleView: () => void;
}

export function OrbitControlPanel({
  deltaV,
  onDeltaVChange,
  onPrograde,
  onRetrograde,
  onReset,
  is2D,
  onToggleView,
}: OrbitControlsProps) {
  return (
    <div className="glass-panel p-4 space-y-4">
      {/* Delta-V Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-display text-muted-foreground tracking-widest">
            Δv ADJUSTMENT
          </span>
          <span className="text-sm font-mono text-primary data-readout">
            {deltaV.toFixed(2)} km/s
          </span>
        </div>
        <Slider
          value={[deltaV]}
          onValueChange={(v) => onDeltaVChange(v[0])}
          min={0}
          max={5}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Burn Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="prograde" onClick={onPrograde} className="gap-2">
          <ChevronUp className="h-4 w-4" />
          Prograde
        </Button>
        <Button variant="retrograde" onClick={onRetrograde} className="gap-2">
          <ChevronDown className="h-4 w-4" />
          Retrograde
        </Button>
      </div>

      {/* View Controls */}
      <div className="flex gap-2">
        <Button variant="glass" size="sm" onClick={onToggleView} className="flex-1 gap-2">
          {is2D ? <Crosshair className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {is2D ? "3D View" : "2D View"}
        </Button>
        <Button variant="ghost" size="icon" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
