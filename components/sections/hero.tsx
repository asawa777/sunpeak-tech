"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Scene } from "@/components/3d/scene"
import { ScrollCityHero } from "@/components/3d/scroll-city-hero"
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#020408]">
      {/* 3D Scroll-Reactive City Scene */}
      <div className="absolute inset-0 z-0 opacity-100">
         <Scene className="w-full h-full">
            <ScrollCityHero />
         </Scene>
      </div>
      
      {/* Overlay Gradient for Text Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/60 to-background/90 pointer-events-none" />

      <div className="container px-4 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block rounded-full bg-secondary/10 border border-cyan-500/30 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-6 backdrop-blur-md">
            🚀 Innovating the Future of IT
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
            {t('title')}
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
             {t('subtitle')}
          </p>

          <motion.div 
             className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button size="lg" variant="gradient" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/services">
                {t('ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/contact">{t('ctaSecondary')}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
