import { motion } from "framer-motion";
import { Gauge, ArrowUp, Clock, Zap } from "lucide-react";

interface DataDashboardProps {
  velocity: number;
  altitude: number;
  period: number;
  deltaV: number;
}

export function DataDashboard({ velocity, altitude, period, deltaV }: DataDashboardProps) {
  const stats = [
    {
      icon: Gauge,
      label: "VELOCITY",
      value: velocity.toFixed(2),
      unit: "km/s",
      colorClass: "text-primary data-readout",
    },
    {
      icon: ArrowUp,
      label: "ALTITUDE",
      value: altitude.toFixed(0),
      unit: "km",
      colorClass: "text-secondary data-readout-red",
    },
    {
      icon: Clock,
      label: "PERIOD",
      value: period.toFixed(1),
      unit: "min",
      colorClass: "text-accent data-readout-green",
    },
    {
      icon: Zap,
      label: "DELTA-V",
      value: deltaV.toFixed(2),
      unit: "km/s",
      colorClass: "text-primary data-readout",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className={`h-3 w-3 ${stat.colorClass.split(' ')[0]}`} />
            <span className="text-[9px] text-muted-foreground font-display tracking-widest">
              {stat.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-mono font-bold ${stat.colorClass}`}>
              {stat.value}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">{stat.unit}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
