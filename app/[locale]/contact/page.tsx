import { PageTemplate } from "@/components/templates/page-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, Handshake } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ContactLandingPage() {
  const t = useTranslations('contactPage')

  return (
    <PageTemplate 
      title={t('title')}
      description={t('description')}
      badge={t('badge')}
      type="general"
    >
      <div className="max-w-4xl mx-auto space-y-24">
         {/* Hero / Intro */}
         <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('hero.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                 <Link href="/contact/request-a-consultation">
                   <Button size="lg" variant="default" className="rounded-full px-8">
                     {t('hero.actions.consult')} <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                 </Link>
                 <Link href="mailto:sunpeaktech.th@gmail.com">
                   <Button size="lg" variant="outline" className="rounded-full">
                     {t('hero.actions.email')}
                   </Button>
                 </Link>
            </div>
         </div>

         {/* Navigation Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/contact/contact-information" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t('grid.info.title')}</h3>
                <p className="text-muted-foreground">{t('grid.info.description')}</p>
            </Link>

            <Link href="/contact/request-a-consultation" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t('grid.consult.title')}</h3>
                <p className="text-muted-foreground">{t('grid.consult.description')}</p>
            </Link>

            <Link href="/contact/partner-with-us" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <Handshake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t('grid.partner.title')}</h3>
                <p className="text-muted-foreground">{t('grid.partner.description')}</p>
            </Link>

            <Link href="/contact/office-locations" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t('grid.office.title')}</h3>
                <p className="text-muted-foreground">{t('grid.office.description')}</p>
            </Link>
         </div>

         {/* Trust Footer */}
         <div className="text-center pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">{t('trust')}</p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="h-8 w-24 bg-foreground/20 rounded" />
               <div className="h-8 w-24 bg-foreground/20 rounded" />
               <div className="h-8 w-24 bg-foreground/20 rounded" />
               <div className="h-8 w-24 bg-foreground/20 rounded" />
            </div>
         </div>
      </div>
    </PageTemplate>
  )
}
