"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

import LanguageSwitch from "@/components/layout/LanguageSwitcher"

export function Header() {
  const t = useTranslations()
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            {/* Logo: Electric Cyan text only */}
            <span className="text-xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors duration-300">
              Sunpeak Tech
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.mainNav.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t(item.title)}
                  {item.items && <ChevronDown className="h-3 w-3 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
                </Link>
                
                {item.items && (
                   <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 min-w-[220px]">
                      <div className="bg-[#1A2233]/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-2 overflow-hidden">
                        {item.items.map((subItem) => (
                           <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                           >
                               {t(subItem.title)}
                           </Link>
                        ))}
                      </div>
                   </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
             <LanguageSwitch />
             {/* Support Button: Ghost style */}
             <Button variant="ghost" size="sm" asChild className="hover:text-primary hover:bg-white/5">
                <Link href="/contact/support">{t('nav.support')}</Link>
             </Button>
             {/* CTA Button: Electric Cyan Border/Glow style implementation */}
            <Button 
              size="sm" 
              asChild
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_-5px_var(--color-primary)]"
            >
              <a href="tel:0969199797">{t('nav.get_quote')}</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B1220] absolute top-full left-0 w-full overflow-y-auto border-t border-white/10"
          >
            <div className="container px-4 py-8 space-y-6">
              {siteConfig.mainNav.map((item) => (
                <div key={item.title} className="space-y-3">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-white"
                  >
                    {t(item.title)}
                  </Link>
                  {item.items && (
                    <div className="pl-4 space-y-2 border-l-2 border-white/10">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-gray-400 hover:text-primary"
                        >
                          {t(subItem.title)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
               <div className="pt-6 space-y-4 border-t border-white/10 mt-6">
                  <div className="flex justify-start pb-4">
                      <LanguageSwitch />
                  </div>
                  <Button className="w-full justify-start text-gray-300 hover:text-white" variant="ghost" asChild>
                     <Link href="/contact/support">{t('nav.support')}</Link>
                  </Button>
                   <Button className="w-full bg-primary text-[#0B1220] hover:bg-primary/90" asChild>
                      <a href="tel:0969199797">{t('nav.get_quote')}</a>
                   </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
