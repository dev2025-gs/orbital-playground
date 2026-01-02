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
      color: "text-primary",
    },
    {
      icon: ArrowUp,
      label: "ALTITUDE",
      value: altitude.toFixed(0),
      unit: "km",
      color: "text-secondary",
    },
    {
      icon: Clock,
      label: "PERIOD",
      value: period.toFixed(1),
      unit: "min",
      color: "text-accent",
    },
    {
      icon: Zap,
      label: "Δv",
      value: deltaV.toFixed(2),
      unit: "km/s",
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-xs text-muted-foreground font-display tracking-widest">
              {stat.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold ${stat.color} data-readout`}>
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground">{stat.unit}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
