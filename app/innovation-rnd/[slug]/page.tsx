import { innovationContent } from "@/config/innovation-content"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"
import { PageTemplate } from "@/components/templates/page-template"

interface PageProps { params: Promise<{ slug: string }> }

function getData(slug: string) {
  const path = `/innovation-rnd/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "Innovation")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "Innovation")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

export default async function InnovationPage({ params }: PageProps) {
  const { slug } = await params
  const navData = getData(slug)
  const content = innovationContent[slug as keyof typeof innovationContent] as any

  if (!content && !navData) return <PageTemplate title={slug} type="general" />

  const title = content?.title || navData?.title || slug
  const description = content?.description || `Pioneering ${title} research.`
  const badge = content?.badge || "Innovation"
  // Map scene to supported types
  const type = (['grid', 'server', 'orb'].includes(content?.scene || '') ? content?.scene : 'tech') as any

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

         {/* Methodology & Process */}
         {content?.methodology && (
            <div>
               <h3 className="text-2xl font-bold mb-8">Research Methodology</h3>
               <div className="grid gap-6">
                  {content.methodology.map((step: any, i: number) => (
                     <div key={i} className="flex gap-4 p-6 bg-secondary/5 rounded-xl border border-border">
                        <div className="text-4xl font-bold text-primary/20">{i + 1}</div>
                        <div>
                           <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                           <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
         
         {/* Lab Capabilities */}
          {content?.capabilities && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {content.capabilities.map((cap: any, i: number) => (
                  <div key={i} className="p-6 bg-card border border-border rounded-xl">
                      <div className="h-2 w-2 bg-green-500 rounded-full mb-4 animate-pulse" />
                      <h4 className="font-bold mb-2">{cap.title}</h4>
                      <p className="text-sm text-muted-foreground">{cap.desc}</p>
                  </div>
               ))}
            </div>
         )}

         {/* Collaboration Models */}
         {content?.models && (
             <div className="bg-primary/5 rounded-3xl p-8">
               <h3 className="text-2xl font-bold mb-6">Collaboration Models</h3>
               <div className="space-y-4">
                  {content.models.map((model: any, i: number) => (
                      <div key={i} className="flex items-center gap-4">
                         <div className="h-px bg-primary/20 flex-1" />
                         <div className="w-1/2">
                           <h4 className="font-bold">{model.title}</h4>
                           <p className="text-sm text-muted-foreground">{model.desc}</p>
                         </div>
                      </div>
                  ))}
               </div>
             </div>
         )}

          {/* Publications Categories */}
          {content?.categories && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.categories.map((cat: any, i: number) => (
                   <div key={i} className="text-center p-6 border border-dashed border-border rounded-xl hover:bg-secondary/5 transition-colors">
                      <h4 className="font-bold mb-2">{cat.title}</h4>
                      <p className="text-sm text-muted-foreground">{cat.desc}</p>
                   </div>
                ))}
            </div>
          )}

         {/* Lists (Focus Areas, Facilities, Partners) */}
         {(content?.focusAreas || content?.facilities || content?.partners || content?.latest) && (
            <div className="pt-8 border-t border-border">
               <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-6">
                  {content.focusAreas ? "Research Focus" : 
                   content.facilities ? "Key Facilities" : 
                   content.partners ? "Academic Partners" : "Latest Publications"}
               </h4>
               <div className="flex flex-wrap gap-3">
                  {(content.focusAreas || content.facilities || content.partners || content.latest)?.map((item: string) => (
                      <span key={item} className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm font-medium">
                         {item}
                      </span>
                  ))}
               </div>
            </div>
         )}
      </div>
    </PageTemplate>
  )
}
