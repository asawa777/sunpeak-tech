"use client"

import { motion } from "framer-motion"
import { Server, Shield, Code2, Cpu, Headphones, ArrowRight, GraduationCap } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "IT Infrastructure",
    description: "Robust network systems, data centers, and disaster recovery solutions.",
    icon: Server,
    href: "/services/it-infrastructure"
  },
  {
    title: "Cyber Security",
    description: "Comprehensive security assessments, SOC monitoring, and ISO compliance.",
    icon: Shield,
    href: "/services/cyber-security"
  },
  {
    title: "Software Engineering",
    description: "Custom web applications, system design, and database management.",
    icon: Code2,
    href: "/services/software-engineering"
  },
  {
    title: "Smart Systems",
    description: "Automation, audio-visual integration, and smart building technologies.",
    icon: Cpu,
    href: "/services/smart-systems"
  },
  {
    title: "Managed Services",
    description: "24/7 IT support, system maintenance, and on-site assistance.",
    icon: Headphones,
    href: "/services/managed-services"
  },
  {
    title: "Training & Education",
    description: "Professional workshops, seminars, and academic research collaboration.",
    icon: GraduationCap,
    href: "/solutions/research-training"
  }
]

export function ServicesGrid() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Comprehensive IT Services</h2>
          <p className="text-lg text-muted-foreground">
            End-to-end technology solutions designed to scale with your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-background p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                {service.description}
              </p>
              
              <Link 
                href={service.href} 
                className="inline-flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
