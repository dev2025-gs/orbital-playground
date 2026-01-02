import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, BookOpen, Atom, Orbit, Target } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

interface AcademyTopic {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  content: string;
  diagrams?: string[];
}

const topics: AcademyTopic[] = [
  {
    id: "keplers-laws",
    icon: Orbit,
    title: "Kepler's Laws",
    subtitle: "The foundation of orbital mechanics",
    content: `
## First Law: The Law of Ellipses
Each planet's orbit around the Sun is an ellipse with the Sun at one focus.

**Key concept:** All orbits are conic sections (circles, ellipses, parabolas, or hyperbolas).

## Second Law: The Law of Equal Areas
A line connecting the Sun and a planet sweeps out equal areas in equal time intervals.

**Key concept:** Planets move faster when closer to the Sun (perihelion) and slower when farther (aphelion).

## Third Law: The Law of Periods
The square of the orbital period is proportional to the cube of the semi-major axis.

**Formula:** T² = (4π²/GM) × a³

Where:
- T = orbital period
- G = gravitational constant
- M = mass of central body
- a = semi-major axis
    `,
  },
  {
    id: "rocket-equation",
    icon: Atom,
    title: "The Rocket Equation",
    subtitle: "Tsiolkovsky's fundamental equation",
    content: `
## The Tyranny of the Rocket Equation

The Tsiolkovsky rocket equation describes the motion of vehicles that follow the basic principle of a rocket: expelling mass to produce thrust.

**The Equation:**
Δv = Isp × g₀ × ln(m₀/mf)

Where:
- Δv = change in velocity
- Isp = specific impulse (efficiency)
- g₀ = standard gravity (9.81 m/s²)
- m₀ = initial mass (with fuel)
- mf = final mass (without fuel)

## Why It's Called "Tyranny"

The logarithmic relationship means that to achieve higher Δv, you need exponentially more fuel. This fundamental constraint limits what's possible in space travel.

**Example:** To achieve 10 km/s Δv with an Isp of 300s:
- Mass ratio required: ~30
- 97% of your rocket must be fuel!
    `,
  },
  {
    id: "lagrange-points",
    icon: Target,
    title: "Lagrange Points",
    subtitle: "Gravitational equilibrium positions",
    content: `
## The Five Lagrange Points

Lagrange points are positions in space where the gravitational forces of two large bodies (like the Sun and Earth) create regions of equilibrium for a smaller object.

## L1 - Between the Bodies
Located between Earth and Sun (~1.5 million km from Earth). Used for solar observation (SOHO, DSCOVR).

## L2 - Beyond the Smaller Body
Located behind Earth away from Sun (~1.5 million km). Used for deep space observation (James Webb Space Telescope).

## L3 - Opposite Side
Located on the opposite side of the Sun from Earth. Theoretically useful but practically difficult to reach.

## L4 & L5 - Trojan Points
Located 60° ahead and behind Earth in its orbit. These are stable "parking spots" - asteroids naturally collect here (Trojan asteroids).

**Stability:**
- L1, L2, L3: Unstable (require station-keeping)
- L4, L5: Stable (objects naturally stay)
    `,
  },
  {
    id: "n-body",
    icon: BookOpen,
    title: "N-Body Problems",
    subtitle: "When three isn't a crowd, it's chaos",
    content: `
## The N-Body Problem

The N-body problem asks: Given the initial positions and velocities of N celestial bodies, predict their subsequent motion under gravitational attraction.

## Why It's Hard

**Two-Body Problem:** Has an exact analytical solution (Kepler's laws).

**Three-Body Problem:** No general closed-form solution exists! Henri Poincaré proved this leads to chaotic behavior.

## Chaos in Space

Small changes in initial conditions lead to vastly different outcomes. This is deterministic chaos - the system is predictable in theory but not in practice.

## Modern Approaches

1. **Numerical Integration:** Step-by-step calculation using computers
2. **Perturbation Theory:** Treat as two-body + small corrections
3. **Restricted Three-Body Problem:** Assume one mass is negligible

**Fun Fact:** The stability of our solar system isn't guaranteed! Simulations show Mercury could be ejected in billions of years.
    `,
  },
];

export default function Academy() {
  const [selectedTopic, setSelectedTopic] = useState<AcademyTopic | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTopicClick = (topic: AcademyTopic) => {
    setSelectedTopic(topic);
    setIsDrawerOpen(true);
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
            <span className="orbital-gradient">Academy</span>
          </h1>
          <p className="text-muted-foreground">
            Master the fundamentals of orbital mechanics and space dynamics
          </p>
        </motion.div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic, index) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleTopicClick(topic)}
              className="glass-panel p-6 text-left group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Content Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[85vh] bg-card border-border">
            <DrawerHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedTopic && (
                    <div className="p-2 rounded-lg bg-primary/20">
                      <selectedTopic.icon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <DrawerTitle className="font-display text-xl orbital-gradient">
                    {selectedTopic?.title}
                  </DrawerTitle>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="p-6 overflow-auto">
              <AnimatePresence mode="wait">
                {selectedTopic && (
                  <motion.div
                    key={selectedTopic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="prose prose-invert max-w-none"
                  >
                    <div className="space-y-4 text-foreground">
                      {selectedTopic.content.split("\n").map((line, i) => {
                        if (line.startsWith("## ")) {
                          return (
                            <h2 key={i} className="text-xl font-display font-bold text-primary mt-6 mb-3">
                              {line.replace("## ", "")}
                            </h2>
                          );
                        }
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return (
                            <p key={i} className="font-semibold text-secondary">
                              {line.replace(/\*\*/g, "")}
                            </p>
                          );
                        }
                        if (line.startsWith("- ")) {
                          return (
                            <li key={i} className="text-muted-foreground ml-4">
                              {line.replace("- ", "")}
                            </li>
                          );
                        }
                        if (line.trim() === "") {
                          return <br key={i} />;
                        }
                        return (
                          <p key={i} className="text-muted-foreground leading-relaxed">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </MainLayout>
  );
}
