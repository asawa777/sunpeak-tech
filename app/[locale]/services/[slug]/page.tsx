import { newServicesContent } from "@/config/new-services-content"
import { notFound } from "next/navigation"
import { PageTemplate } from "@/components/templates/page-template"

interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
   return Object.keys(newServicesContent).map(slug => ({ slug }))
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const content = newServicesContent[slug as keyof typeof newServicesContent] as any

  if (!content) return notFound()

  // Map scene to supported types
  const type = (['orb', 'grid', 'city', 'shield', 'server'].includes(content?.scene || '') ? content?.scene : 'tech') as any

  return (
    <PageTemplate 
      title={content.title}
      description={content.description}
      badge={content.badge}
      type={type}
    >
      <div className="max-w-4xl mx-auto space-y-16">
         {/* Overview */}
         <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">{content.overview}</p>
         </div>

         {/* Features */}
         {content.features && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {content.features.map((feature: any, i: number) => (
                  <div key={i} className="p-6 bg-card border border-border rounded-xl">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary font-bold">
                         {i + 1}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
               ))}
            </div>
         )}

         {/* Technical Specs */}
         {content.technicalSpecs && (
            <div className="bg-secondary/5 border border-border rounded-2xl p-8">
               <h3 className="text-lg font-bold mb-6">Technical Capabilities</h3>
               <div className="flex flex-wrap gap-2">
                  {content.technicalSpecs.map((spec: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-background border border-border rounded-full text-sm font-mono text-muted-foreground">
                         {spec}
                      </span>
                  ))}
               </div>
            </div>
         )}
      </div>
    </PageTemplate>
  )
}
