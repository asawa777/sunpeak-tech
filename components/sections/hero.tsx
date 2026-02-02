"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-70 dark:from-blue-900/40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="container px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground mb-4">
            🚀 Innovating the Future of IT
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Intelligent Solutions for a <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient-x">
              Connected World
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             We empower enterprises, governments, and industries with next-gen IT infrastructure, cybersecurity, and smart systems.
          </p>

          <motion.div 
             className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button size="lg" variant="gradient" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/services">
                Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/contact">Match with an Expert</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

       {/* Decorative Elements */}
       <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce">
          <div className="h-10 w-6 border-2 border-muted-foreground rounded-full flex justify-center p-1">
             <div className="w-1 h-3 bg-muted-foreground rounded-full" />
          </div>
       </div>
    </section>
  )
}
