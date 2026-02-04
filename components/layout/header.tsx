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
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className={cn(
               "text-2xl font-bold tracking-tight transition-colors duration-300",
               scrolled ? "text-primary" : "text-white"
            )}>
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
                    "text-sm font-medium transition-colors flex items-center gap-1",
                    scrolled 
                       ? "text-gray-600 hover:text-primary" 
                       : "text-white/90 hover:text-white",
                    pathname === item.href && (scrolled ? "text-primary font-semibold" : "text-white font-semibold")
                  )}
                >
                  {t(item.title)}
                  <ChevronDown className={cn(
                    "h-3 w-3 transition-transform duration-200 group-hover:rotate-180",
                    scrolled ? "opacity-50" : "text-white/70"
                  )} />
                </Link>
                
                {item.items && (
                   <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 min-w-[240px]">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden ring-1 ring-black/5">
                        {item.items.map((subItem) => (
                           <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="block px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
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
             
             {/* Support Button */}
             <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className={cn(
                    scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10 hover:text-white"
                )}
             >
                <Link href="/contact/support">{t('nav.support')}</Link>
             </Button>
             
             {/* CTA Button - Always Vibrant */}
            <Button 
              size="sm" 
              variant="gradient"
              asChild
              className="shadow-md"
            >
              <a href="tel:0969199797">{t('nav.get_quote')}</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
                "lg:hidden p-2",
                scrolled ? "text-gray-900" : "text-white"
            )}
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
            className="lg:hidden bg-white absolute top-full left-0 w-full overflow-y-auto border-t border-gray-100"
          >
            <div className="container px-4 py-8 space-y-6">
              {siteConfig.mainNav.map((item) => (
                <div key={item.title} className="space-y-3">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-bold text-gray-900"
                  >
                    {t(item.title)}
                  </Link>
                  {item.items && (
                    <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-gray-500 hover:text-primary font-medium"
                        >
                          {t(subItem.title)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
               <div className="pt-6 space-y-4 border-t border-gray-100 mt-6">
                  <div className="flex justify-start pb-4">
                      <LanguageSwitch />
                  </div>
                  <Button className="w-full justify-start text-gray-600 hover:bg-gray-50" variant="ghost" asChild>
                     <Link href="/contact/support">{t('nav.support')}</Link>
                  </Button>
                   <Button className="w-full" variant="gradient" asChild>
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
