"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-50 dark:from-blue-900/20"></div>
      
      <div className="container px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="max-w-3xl mx-auto space-y-4"
        >
          {badge && (
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              {badge}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
