"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"
import { Scene } from "@/components/3d/scene"
import { GlowingOrb } from "@/components/3d/glowing-orb"
import { NetworkGrid } from "@/components/3d/network-grid"
import { motion } from "framer-motion"

interface PageTemplateProps {
  title: string
  description?: string
  badge?: string
  type?: "general" | "tech" | "security"
  content?: string
  children?: React.ReactNode
}

export function PageTemplate({ title, description, badge, type = "general", children }: PageTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 3D Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
           <div className="absolute inset-0 z-0 opacity-50">
              <Scene className="w-full h-full">
                 {type === 'tech' ? <NetworkGrid /> : <GlowingOrb />}
              </Scene>
           </div>
           
           <div className="container relative z-10 px-4 text-center">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
              >
                  {badge && (
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4 backdrop-blur-sm border border-primary/20">
                      {badge}
                    </span>
                  )}
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {title}
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-4 rounded-xl">
                    {description}
                  </p>
              </motion.div>
           </div>
        </section>

        {/* Content Section */}
        <section className="py-20 md:py-24">
           <div className="container px-4 max-w-4xl mx-auto space-y-12">
              {children ? (
                children
              ) : (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                   <p className="lead text-2xl font-light text-muted-foreground">
                      At Sunpeak Tech, we believe in delivering excellence through our 
                      <strong> {title} </strong> services. Our team works tirelessly to ensure
                      top-tier performance and reliability.
                   </p>
                   <hr className="my-12 border-muted" />
                   <h3>Key Features & Benefits</h3>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                      {["Scalable Architecture", "24/7 Monitoring", "Cost Effective", "Future Proof"].map((item) => (
                         <li key={item} className="flex items-center p-4 bg-card border border-border rounded-lg shadow-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                            {item}
                         </li>
                      ))}
                   </ul>
                   <p>
                      Leveraging cutting-edge technologies, we provide solutions that are not just effective but also sustainable. 
                      Whether you are a startup or a large enterprise, our {title?.toLowerCase() || 'services'} capabilities are designed to scale with you.
                   </p>
                </div>
              )}
           </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
