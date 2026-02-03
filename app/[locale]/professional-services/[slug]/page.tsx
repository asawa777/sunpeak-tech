import { PageTemplate } from "@/components/templates/page-template"
import { servicesContent } from "@/config/services-content"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"

interface PageProps { params: Promise<{ slug: string }> }

function getData(slug: string) {
  const path = `/professional-services/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "Services")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "Services")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const navData = getData(slug)
  const content = servicesContent[slug as keyof typeof servicesContent]

  if (!content && !navData) return <PageTemplate title={slug} type="general" />

  const title = content?.title || navData?.title || slug
  const description = content?.description || `Professional ${title} services.`
  const badge = content?.badge || "Service"
  const type = (content?.scene === 'shield' ? 'security' : 'tech') as any

  return (
    <PageTemplate 
      title={title}
      description={description}
      badge={badge}
      type={type}
    >
      <div className="max-w-4xl mx-auto space-y-20">
         {/* Overview */}
         <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">{content?.overview}</p>
         </div>

         {/* Approach */}
         {content?.approach && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="order-2 md:order-1">
                   <div className="relative h-64 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden flex items-center justify-center">
                      <div className="text-4xl opacity-20 font-bold">METHODOLOGY</div>
                   </div>
               </div>
               <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
                  <p className="text-muted-foreground leading-relaxed">{content.approach}</p>
               </div>
            </div>
         )}

         {/* Benefits */}
         {content?.benefits && (
            <div>
               <h3 className="text-2xl font-bold mb-8 text-center">Key Benefits</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.benefits.map((benefit: string) => (
                     <div key={benefit} className="flex items-center p-4 bg-card border border-border rounded-xl">
                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-3 text-xs">
                          ✔️
                        </div>
                        <span className="font-medium">{benefit}</span>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Technologies */}
         {content?.technologies && (
            <div className="bg-secondary/5 rounded-3xl p-8 md:p-12 text-center">
               <h3 className="text-2xl font-bold mb-8">Tools & Technologies</h3>
               <div className="flex flex-wrap justify-center gap-3">
                  {content.technologies.map((tech: string) => (
                     <span key={tech} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium">
                        {tech}
                     </span>
                  ))}
               </div>
            </div>
         )}

         {/* Engagement */}
         {content?.engagement && (
            <div className="p-8 border-l-4 border-primary bg-primary/5 rounded-r-xl">
               <h4 className="font-bold uppercase tracking-wider text-xs text-primary mb-2">Engagement Model</h4>
               <p className="font-medium text-lg">{content.engagement}</p>
            </div>
         )}

         {/* CTA */}
         <div className="text-center py-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-4">Partner with us for success</h3>
            <p className="text-muted-foreground mb-8">Expertise you can trust, results you can measure.</p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
               Get in Touch
            </button>
         </div>
      </div>
    </PageTemplate>
  )
}
