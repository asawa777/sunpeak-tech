import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function getData(slug: string) {
  const path = `/projects/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "Projects")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "Projects")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

import { projectsContent } from "@/config/projects-content"

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const navData = getData(slug)
  const content = projectsContent[slug as keyof typeof projectsContent]

  if (!content && !navData) return <PageTemplate title={slug} type="general" />

  const title = content?.title || navData?.title || slug
  const description = content?.description || `Explore our successful implementations in ${title}.`
  const badge = content?.badge || "Case Study"
  const type = (content?.scene === 'shield' ? 'security' : content?.scene === 'city' ? 'tech' : 'tech') as any

  return (
    <PageTemplate 
      title={title}
      description={description}
      badge={badge}
      type={type}
    >
      <div className="max-w-4xl mx-auto space-y-20">
         {/* Overview */}
         {content?.overview && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-secondary/5 rounded-2xl border border-border">
               <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Industry</div>
                  <div className="font-semibold">{content.overview.industry}</div>
               </div>
               <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Scale</div>
                  <div className="font-semibold">{content.overview.scale}</div>
               </div>
               <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Scope</div>
                  <div className="font-semibold">{content.overview.scope}</div>
               </div>
               <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Env</div>
                  <div className="font-semibold">{content.overview.environment}</div>
               </div>
            </div>
         )}

         {/* Challenges & Solution */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mr-3 text-sm">⚠️</span>
                  The Challenge
               </h3>
               <ul className="space-y-4">
                  {content?.challenges?.map((challenge: string, i: number) => (
                     <li key={i} className="flex items-start">
                        <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                        <span className="text-muted-foreground">{challenge}</span>
                     </li>
                  ))}
               </ul>
            </div>
            <div>
               <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 text-sm">💡</span>
                  Our Solution
               </h3>
               <p className="text-muted-foreground leading-relaxed">
                  {content?.solution}
               </p>
            </div>
         </div>

         {/* Tech Stack */}
         {content?.stack && (
            <div>
               <h3 className="text-2xl font-bold mb-8 text-center">Technology Stack</h3>
               <div className="flex flex-wrap justify-center gap-4">
                  {content.stack.map((tech: string) => (
                     <div key={tech} className="px-6 py-3 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors">
                        <span className="font-mono text-sm">{tech}</span>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Results */}
         {content?.results && (
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
               <h3 className="text-2xl font-bold mb-8 text-center">Impact & Results</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {content.results.map((result: string, i: number) => (
                     <div key={i} className="text-center">
                        <div className="text-4xl font-bold text-primary mb-3">{i+1}</div>
                        <p className="font-medium">{result}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* CTA */}
         <div className="text-center py-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-4">Ready to transform your business?</h3>
            <p className="text-muted-foreground mb-8">Let's discuss how we can drive similar results for you.</p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
               Schedule a Consultation
            </button>
         </div>
      </div>
    </PageTemplate>
  )
}
