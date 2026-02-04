"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

import LanguageSwitch from "@/components/layout/LanguageSwitcher"

export function Header() {
  const t = useTranslations()
  const [scrolled, setScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
      <>
          <nav className={cn(
              "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
              "w-[95%] max-w-7xl rounded-full px-6 py-3",
              "flex items-center justify-between",
              "backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/10",
              scrolled || isOpen ? "bg-[#0b0f19]/90" : "bg-white/5"
          )}>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsOpen(false)}>
                 <span className="text-xl md:text-2xl font-bold tracking-tighter text-white hover:text-blue-100 transition-colors">
                     Sunpeak Tech
                 </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-6">
                  {siteConfig.mainNav.map((item) => (
                      <div key={item.title} className="relative group/nav">
                          <Link 
                              href={item.href} 
                              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1 py-2"
                          >
                             {t(item.title)}
                          </Link>
                          {item.items && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-200 min-w-[240px]">
                                  <div className="bg-[#0b0f19]/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 p-2 overflow-hidden">
                                      {item.items.map((subItem) => (
                                          <Link
                                              key={subItem.title}
                                              href={subItem.href}
                                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                          >
                                              {t(subItem.title)}
                                          </Link>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                   <LanguageSwitch />
                   <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-4 border border-white/20" asChild>
                      <Link href="/contact/support">{t('nav.support')}</Link>
                  </Button>
                  <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-5 font-medium" asChild>
                      <Link href="tel:+66969199797">{t('nav.get_quote')}</Link>
                  </Button>
              </div>

               {/* Mobile Menu Toggle */}
               <button 
                  className="lg:hidden text-white cursor-pointer p-2 z-50"
                  onClick={() => setIsOpen(!isOpen)}
               >
                   {isOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
              {isOpen && (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-40 bg-[#0b0f19]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
                  >
                      <div className="p-6 space-y-6">
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
                                                  className="block text-sm text-gray-400 hover:text-blue-400"
                                              >
                                                  {t(subItem.title)}
                                              </Link>
                                          ))}
                                      </div>
                                  )}
                              </div>
                          ))}
                          <div className="pt-6 border-t border-white/10 space-y-4">
                              <div className="flex justify-start">
                                  <LanguageSwitch />
                              </div>
                              <Button className="w-full justify-start text-white hover:bg-white/10 min-h-[44px]" variant="ghost" asChild>
                                  <Link href="/contact/support">{t('nav.support')}</Link>
                              </Button>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white min-h-[44px]" asChild>
                                  <Link href="tel:+66969199797">{t('nav.get_quote')}</Link>
                              </Button>
                          </div>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
      </>
  )
}
