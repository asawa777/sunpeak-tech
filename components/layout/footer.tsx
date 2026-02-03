"use client"

import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations()
  
  return (
    <footer className="bg-background border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors duration-300">
                Sunpeak Tech
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
             <h3 className="font-semibold mb-6 text-white tracking-wide">{t('footer.col_services')}</h3>
             <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/solutions/information-technology" className="hover:text-primary transition-colors block">{t('servicesGrid.items.it_infra.title')}</Link></li>
                <li><Link href="/solutions/cyber-security" className="hover:text-primary transition-colors block">{t('nav.cyber_security')}</Link></li>
                 <li><Link href="/solutions/software-programs" className="hover:text-primary transition-colors block">{t('servicesGrid.items.software.title')}</Link></li>
                 <li><Link href="/professional-services/operations-managed-services" className="hover:text-primary transition-colors block">{t('nav.managed_services')}</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="font-semibold mb-6 text-white tracking-wide">{t('footer.col_company')}</h3>
             <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors block">{t('nav.about')}</Link></li>
                <li><Link href="/about/management-team" className="hover:text-primary transition-colors block">{t('nav.management_team')}</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors block">{t('nav.careers')}</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors block">{t('nav.contact')}</Link></li>
             </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">{t('footer.col_contact')}</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                <span className="leading-relaxed">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+66969199797" className="hover:text-white transition-colors">(+66) 96-919-9797</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:sunpeaktech.th@gmail.com" className="hover:text-white transition-colors">sunpeaktech.th@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
