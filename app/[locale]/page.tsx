"use client"

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Code, Layers, ShieldCheck, Zap } from 'lucide-react';
import { ScrollCityHero } from '@/components/3d/scroll-city-hero';
import { motion } from 'framer-motion';

export default function Home() {
  const t = useTranslations();

  const services = [
    { title: "Mobile App Development", icon: <Code className="h-6 w-6 text-primary" />, desc: "Native iOS & Android apps built for performance.", href: "/solutions/information-technology/application-database-systems" },
    { title: "Web Development", icon: <Layers className="h-6 w-6 text-purple-600" />, desc: "Scalable web platforms using Next.js and React.", href: "/solutions/software-programs" },
    { title: "AI Solutions", icon: <Zap className="h-6 w-6 text-yellow-500" />, desc: "Intelligent automation and predictive analytics.", href: "/solutions/innovation-rnd" }, // Assumed path based on sitemap
    { title: "Cyber Security", icon: <ShieldCheck className="h-6 w-6 text-cyan-500" />, desc: "Enterprise-grade protection for your data assets.", href: "/solutions/cyber-security" },
  ];

  const stats = [
    { label: "Apps Delivered", value: "500+" },
    { label: "Client Retention", value: "98%" },
    { label: "Years Experience", value: "10+" },
    { label: "Team Experts", value: "150+" },
  ];

  return (
    <main className="min-h-screen bg-[#F9FAFB] overflow-x-hidden">
      
      {/* 1. HERO SECTION (Split Layout) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Top Rated Tech Agency 2026
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Transforming Ideas into <span className="text-primary">Digital Reality</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              We build world-class digital products for startups and enterprises. 
              Award-winning mobile apps, web platforms, and AI solutions driven by results.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-lg shadow-blue-500/20" asChild>
                <a href="/contact">{t('nav.get_quote')}</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/projects">
                   {t('section_projects.title')} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right: 3D Visual (Contained) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] w-full bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-white shadow-2xl overflow-hidden"
          >
             {/* Using the updated ScrollCityHero but constrained to this box */}
             <div className="absolute inset-0">
               <ScrollCityHero />
             </div>
             {/* Overlay to ensure text readability if needed, but handled by split layout */}
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED MARQUEE */}
      <section className="py-10 border-y border-gray-200 bg-white">
        <div className="container mx-auto px-6">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Trusted by Global Leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for logos */}
                <span className="text-2xl font-bold text-gray-300">GOOGLE</span>
                <span className="text-2xl font-bold text-gray-300">MICROSOFT</span>
                <span className="text-2xl font-bold text-gray-300">NETFLIX</span>
                <span className="text-2xl font-bold text-gray-300">SPOTIFY</span>
                <span className="text-2xl font-bold text-gray-300">AMAZON</span>
            </div>
        </div>
      </section>

      {/* 3. BENTO SERVICES GRID */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Empowering Solutions for Tomorrow's Challenges</h2>
              <p className="text-lg text-gray-600">Full-cycle product development services tailored to your business needs.</p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 hover:shadow-xl group"
                >
                   <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                      {service.icon}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                   <p className="text-gray-500 leading-relaxed mb-6">
                      {service.desc}
                   </p>
                   <a href={service.href} className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                   </a>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. STATS STRIP (Dark Mode) */}
      <section className="py-20 bg-secondary text-white">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
               {stats.map((stat, i) => (
                  <div key={i} className="p-4">
                     <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                     <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">What Our Clients Say</h2>
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-12 shadow-sm border border-gray-100 relative">
               <div className="text-primary mb-6 flex justify-center gap-1">
                  {[1,2,3,4,5].map(i => <Zap key={i} className="h-5 w-5 fill-current" />)}
               </div>
               <blockquote className="text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                  "Sunpeak Tech transformed our legacy infrastructure into a modern, scalable cloud platform. Their team's expertise in AI and design is unmatched in the industry."
               </blockquote>
               <div className="flex items-center justify-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div className="text-left">
                     <div className="font-bold text-gray-900">Sarah Johnson</div>
                     <div className="text-sm text-gray-500">CTO, EnterpriseCorp</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
