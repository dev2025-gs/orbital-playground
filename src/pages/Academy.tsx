import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, BookOpen, Atom, Orbit, Target, FileText } from "lucide-react";
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
  faction: "roci" | "mcrn" | "opa" | "un";
  content: string;
}

const topics: AcademyTopic[] = [
  {
    id: "keplers-laws",
    icon: Orbit,
    title: "Kepler's Laws",
    subtitle: "Foundation of orbital mechanics",
    faction: "roci",
    content: `
## First Law: The Law of Ellipses
Each planet's orbit around the Sun is an ellipse with the Sun at one focus.

**TACTICAL NOTE:** All orbits are conic sections - circles, ellipses, parabolas, or hyperbolas.

## Second Law: The Law of Equal Areas
A line connecting the Sun and a planet sweeps out equal areas in equal time intervals.

**TACTICAL NOTE:** Objects move faster at periapsis (closest approach) and slower at apoapsis.

## Third Law: The Law of Periods
T² = (4π²/GM) × a³

The square of the orbital period is proportional to the cube of the semi-major axis.
    `,
  },
  {
    id: "rocket-equation",
    icon: Atom,
    title: "Rocket Equation",
    subtitle: "Tsiolkovsky's tyranny",
    faction: "mcrn",
    content: `
## The Tyranny of the Rocket Equation

The MCRN knows this well. The equation that governs all propulsion:

**Δv = Isp × g₀ × ln(m₀/mf)**

Where:
- Δv = change in velocity
- Isp = specific impulse (drive efficiency)
- g₀ = standard gravity (9.81 m/s²)
- m₀ = initial mass (wet)
- mf = final mass (dry)

## Epstein Drive Advantage

The Epstein Drive's high specific impulse changes the calculus. Where chemical rockets need mass ratios of 10:1 for interplanetary travel, an Epstein-equipped vessel achieves the same with far less reaction mass.

**TACTICAL NOTE:** Even with Epstein, delta-v budgets matter. Plan your burns.
    `,
  },
  {
    id: "lagrange-points",
    icon: Target,
    title: "Lagrange Points",
    subtitle: "Gravitational equilibrium",
    faction: "opa",
    content: `
## The Five Lagrange Points

The OPA knows these well - natural harbors in the void where the gravitational pull of two bodies creates stability.

## L1 - Between Bodies
Between Earth and Sun (~1.5M km from Earth). Used for solar observation.

## L2 - Beyond Smaller Body  
Behind Earth from Sun (~1.5M km). Deep space observation (like Tycho Station's telescopes).

## L3 - Opposite Side
On the opposite side of the Sun from Earth. Difficult to reach, useful for hiding.

## L4 & L5 - Trojan Points
60° ahead and behind in orbit. **STABLE.** The Belt's natural collection points. Asteroids gather here - and so do Belters.

**OPA NOTE:** L4 and L5 are where you hide when inners come looking.
    `,
  },
  {
    id: "n-body",
    icon: BookOpen,
    title: "N-Body Problems",
    subtitle: "When physics gets complicated",
    faction: "un",
    content: `
## The N-Body Problem

The UN's best computers still struggle with this one.

**Two-Body Problem:** Exact solution exists (Kepler)
**Three-Body Problem:** No general closed-form solution. Chaos.

## Why It Matters

Small changes in initial conditions lead to vastly different outcomes. This is deterministic chaos - predictable in theory, impossible in practice.

## Computational Approaches

1. **Numerical Integration:** Step-by-step calculation
2. **Perturbation Theory:** Two-body + corrections
3. **Restricted Three-Body:** Assume one mass is negligible

## The Ring Gate Problem

The protomolecule gates introduce non-local effects that don't follow classical mechanics. Our models are... insufficient.

**UN CLASSIFICATION:** Some things are beyond current understanding.
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

  const getFactionStyles = (faction: string) => {
    switch (faction) {
      case "roci": return "bg-primary/10 text-primary border-primary/30";
      case "mcrn": return "bg-secondary/10 text-secondary border-secondary/30";
      case "opa": return "bg-accent/10 text-accent border-accent/30";
      case "un": return "bg-info/10 text-info border-info/30";
      default: return "";
    }
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
            <FileText className="h-4 w-4 text-accent" />
            <span className="text-[10px] text-muted-foreground tracking-[0.3em]">DATA ARCHIVE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="orbital-gradient">ACADEMY</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            ORBITAL MECHANICS REFERENCE DATABASE
          </p>
        </motion.div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic, index) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleTopicClick(topic)}
              className="tactical-panel p-5 text-left group hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-sm border ${getFactionStyles(topic.faction)}`}>
                    <topic.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold tracking-wider group-hover:text-primary transition-colors">
                      {topic.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">{topic.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
                    <div className={`p-2 rounded-sm border ${getFactionStyles(selectedTopic.faction)}`}>
                      <selectedTopic.icon className="h-4 w-4" />
                    </div>
                  )}
                  <DrawerTitle className="font-display text-lg text-primary tracking-widest">
                    {selectedTopic?.title.toUpperCase()}
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
                  >
                    <div className="space-y-3 text-foreground">
                      {selectedTopic.content.split("\n").map((line, i) => {
                        if (line.startsWith("## ")) {
                          return (
                            <h2 key={i} className="text-lg font-display font-bold text-primary mt-6 mb-2 tracking-wider">
                              {line.replace("## ", "").toUpperCase()}
                            </h2>
                          );
                        }
                        if (line.startsWith("**") && line.includes(":**")) {
                          const [label, content] = line.split(":**");
                          return (
                            <p key={i} className="text-sm">
                              <span className="font-display text-secondary tracking-wide">{label.replace(/\*\*/g, "")}:</span>
                              <span className="text-muted-foreground font-mono"> {content?.replace(/\*\*/g, "")}</span>
                            </p>
                          );
                        }
                        if (line.startsWith("- ")) {
                          return (
                            <li key={i} className="text-muted-foreground font-mono text-sm ml-4">
                              {line.replace("- ", "")}
                            </li>
                          );
                        }
                        if (line.trim() === "") return <br key={i} />;
                        return (
                          <p key={i} className="text-muted-foreground font-mono text-sm leading-relaxed">
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
