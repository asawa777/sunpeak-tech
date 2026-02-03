import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
// Import Slot if utilizing asChild pattern, but sticking to standard structure for now or ensure proper import if available
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-[#0B1220] hover:bg-primary/90 shadow-[0_0_15px_-5px_var(--color-primary)] font-semibold",
        destructive:
          "bg-red-900 border border-red-800 text-red-100 hover:bg-red-800",
        outline:
          "border border-primary/20 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",
        ghost: "hover:bg-accent hover:text-white text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-linear-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg hover:shadow-primary/20 border border-white/10",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
