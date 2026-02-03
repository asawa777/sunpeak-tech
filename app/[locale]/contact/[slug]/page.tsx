import { contactPages } from "@/config/contact-content"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"
import { PageTemplate } from "@/components/templates/page-template"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Clock, MapPin } from "lucide-react"
import { ConsultationForm } from "@/components/forms/consultation-form"

interface PageProps { params: Promise<{ slug: string }> }

function getData(slug: string) {
  const path = `/contact/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "Contact")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "Contact")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

export default async function ContactSubPage({ params }: PageProps) {
  const { slug } = await params
  const navData = getData(slug)
  const content = contactPages[slug as keyof typeof contactPages] as any

  if (!content && !navData) return <PageTemplate title={slug} type="general" />

  const title = content?.title || navData?.title || slug
  const description = content?.description || `Contact Sunpeak Tech.`
  const badge = content?.badge || "Contact"
  const type = (['city', 'shield', 'orb', 'grid'].includes(content?.scene || '') ? content?.scene : 'general') as any

  return (
    <PageTemplate 
      title={title}
      description={description}
      badge={badge}
      type={type}
    >
      <div className="max-w-4xl mx-auto space-y-20">
         {/* Overview */}
         <div className="prose prose-lg dark:prose-invert max-w-none text-center mx-auto">
            <p className="lead text-xl text-muted-foreground">{content?.overview}</p>
         </div>

         {/* Contact Details List */}
         {content?.details && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {content.details.map((detail: any, i: number) => (
                  <div key={i} className="flex flex-col items-center p-8 bg-secondary/5 rounded-2xl border border-border text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                         {detail.type === 'email' ? <Mail /> : detail.type === 'phone' ? <Phone /> : <Clock />}
                      </div>
                      <div className="text-sm font-bold text-muted-foreground uppercase mb-1">{detail.label}</div>
                      <div className="font-bold text-lg">{detail.value}</div>
                  </div>
               ))}
            </div>
         )}
         
         {/* Consultation Form (Functional) */}
         {content?.consultationTypes && (
            <ConsultationForm types={content.consultationTypes} note={content.formNote} />
         )}

         {/* Partner Types */}
         {content?.partnerTypes && (
             <div className="grid grid-cols-1 gap-6">
               {content.partnerTypes.map((pt: any, i: number) => (
                  <div key={i} className="flex gap-6 p-6 bg-secondary/5 rounded-xl border border-border">
                      <div className="shrink-0 h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                         🤝
                      </div>
                      <div>
                         <h3 className="text-xl font-bold mb-2">{pt.title}</h3>
                         <p className="text-muted-foreground">{pt.desc}</p>
                      </div>
                  </div>
               ))}
             </div>
         )}

         {/* Locations (Map) */}
         {content?.locations && (
             <div className="space-y-8">
               {content.locations.map((loc: any, i: number) => (
                  <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                     <div className="h-64 bg-secondary/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                        <div className="text-muted-foreground font-mono text-sm flex items-center gap-2">
                           <MapPin className="h-4 w-4" /> Map Placeholder: {loc.city}, {loc.country}
                        </div>
                     </div>
                     <div className="p-8">
                        <h3 className="text-2xl font-bold mb-2">{loc.city}, {loc.country} (HQ)</h3>
                        <p className="text-lg text-muted-foreground">{loc.address}</p>
                     </div>
                  </div>
               ))}
             </div>
         )}
      </div>
    </PageTemplate>
  )
}
