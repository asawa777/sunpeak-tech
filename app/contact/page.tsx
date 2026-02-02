import { contactLanding } from "@/config/contact-content"
import { PageTemplate } from "@/components/templates/page-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, Handshake } from "lucide-react"

export default function ContactLandingPage() {
  const content = contactLanding

  return (
    <PageTemplate 
      title={content.title}
      description={content.description}
      badge={content.badge}
      type={content.scene as any}
    >
      <div className="max-w-4xl mx-auto space-y-24">
         {/* Hero / Intro */}
         <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{content.hero.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               {content.hero.actions.map((action, i) => (
                 <Link key={i} href={action.href}>
                   <Button size="lg" variant={action.primary ? "default" : "outline"} className={action.primary ? "rounded-full px-8" : "rounded-full"}>
                     {action.label} {action.primary && <ArrowRight className="ml-2 h-4 w-4" />}
                   </Button>
                 </Link>
               ))}
            </div>
         </div>

         {/* Navigation Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/contact/contact-information" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Contact Information</h3>
                <p className="text-muted-foreground">Direct lines for support, sales, and general inquiries via email and phone.</p>
            </Link>

            <Link href="/contact/request-a-consultation" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Request Consultation</h3>
                <p className="text-muted-foreground">Schedule a free exploratory session with our solution architects.</p>
            </Link>

            <Link href="/contact/partner-with-us" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <Handshake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Partner with Us</h3>
                <p className="text-muted-foreground">Joint ventures and strategic alliances for technology vendors.</p>
            </Link>

            <Link href="/contact/office-locations" className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                   <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Office Locations</h3>
                <p className="text-muted-foreground">Visit our headquarters in Bangkok, Thailand.</p>
            </Link>
         </div>

         {/* Trust Footer */}
         <div className="text-center pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Trusted by Enterprise Clients across Thailand</p>
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
