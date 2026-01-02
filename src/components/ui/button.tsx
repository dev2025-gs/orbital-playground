import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-display tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase border",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90",
        outline:
          "border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_10px_hsl(var(--primary)/0.3)]",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 hover:shadow-[0_0_15px_hsl(var(--secondary)/0.5)]",
        ghost: "border-transparent text-foreground hover:bg-muted hover:text-primary",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        // Expanse-themed variants
        roci:
          "bg-gradient-to-r from-roci-amber to-roci-dim text-primary-foreground border-roci-amber hover:shadow-[0_0_20px_hsl(var(--roci-amber)/0.5)] hover:scale-[1.02]",
        mcrn:
          "bg-mcrn-red/20 border-mcrn-red text-mcrn-red hover:bg-mcrn-red hover:text-white hover:shadow-[0_0_20px_hsl(var(--mcrn-red)/0.5)]",
        opa:
          "bg-opa-green/20 border-opa-green text-opa-green hover:bg-opa-green hover:text-white hover:shadow-[0_0_20px_hsl(var(--opa-green)/0.5)]",
        un:
          "bg-un-blue/20 border-un-blue text-un-blue hover:bg-un-blue hover:text-white hover:shadow-[0_0_20px_hsl(var(--un-blue)/0.5)]",
        prograde:
          "bg-primary/20 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]",
        retrograde:
          "bg-secondary/20 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:shadow-[0_0_20px_hsl(var(--secondary)/0.6)]",
        tactical:
          "bg-card/80 backdrop-blur-sm border-border text-foreground hover:border-primary/50 hover:text-primary",
        orbital:
          "bg-gradient-to-r from-primary to-roci-dim text-primary-foreground border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] hover:scale-[1.02]",
        glass:
          "bg-card/60 backdrop-blur-sm border-border/50 text-foreground hover:bg-card/80 hover:border-primary/50",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-sm",
        sm: "h-9 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        xl: "h-14 rounded-sm px-10 text-base",
        icon: "h-10 w-10 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
