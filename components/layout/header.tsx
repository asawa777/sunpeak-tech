"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export function Header() {
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
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Sunpeak Tech
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {siteConfig.mainNav.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.title}
                  {item.items && <ChevronDown className="h-3 w-3 opacity-50" />}
                </Link>
                
                {item.items && (
                   <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 min-w-[200px]">
                      <div className="bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border p-2">
                        {item.items.map((subItem) => (
                           <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                           >
                              {subItem.title}
                           </Link>
                        ))}
                      </div>
                   </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
             <Button variant="ghost" size="sm" asChild>
                <Link href="/contact/support">Support</Link>
             </Button>
            <Button variant="gradient" size="sm" asChild>
              <Link href="/contact/request-quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground"
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
            className="lg:hidden bg-background absolute top-full left-0 w-full overflow-y-auto border-t"
          >
            <div className="container px-4 py-8 space-y-6">
              {siteConfig.mainNav.map((item) => (
                <div key={item.title} className="space-y-3">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-foreground"
                  >
                    {item.title}
                  </Link>
                  {item.items && (
                    <div className="pl-4 space-y-2 border-l-2 border-muted">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
               <div className="pt-6 space-y-4">
                  <Button className="w-full" variant="ghost" asChild>
                     <Link href="/contact/support">Support</Link>
                  </Button>
                  <Button className="w-full" variant="gradient" asChild>
                     <Link href="/contact/request-quote">Get a Quote</Link>
                  </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
