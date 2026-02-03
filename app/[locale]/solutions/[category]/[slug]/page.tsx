import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

// Helper to find page data
function getPageData(category: string, slug: string) {
  const cleanPath = `/solutions/${category}/${slug}`
  
  // Flatten the sitemap to find the item
  for (const section of siteConfig.mainNav) {
    if (section.items) {
      for (const group of section.items) {
          // Check if 'group' has items (it might be a direct link in some configs, though not ours)
          if ('items' in group && group.items) {
             const found = group.items.find(item => item.href === cleanPath)
             if (found) return { ...found, category: group.title }
          }
      }
    }
  }
  return null
}

export function generateStaticParams() {
   // Generate all possible paths for static export
   const params = []
   const solutions = siteConfig.mainNav.find(n => n.title === "Solutions & Products")
   if (solutions?.items) {
      for (const group of solutions.items) {
         const category = group.href.split('/').pop()
         if ('items' in group && group.items) {
            for (const item of group.items) {
               const slug = item.href.split('/').pop()
               if (category && slug) params.push({ category, slug })
            }
         }
      }
   }
   return params
}

import { solutionsContent } from "@/config/solutions-content"

export default async function SolutionPage({ params }: PageProps) {
  const { category, slug } = await params
  const navData = getPageData(category, slug)
  const content = solutionsContent[slug as keyof typeof solutionsContent] as any
  
  if (!content && !navData) {
     const title = slug 
       ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
       : "Solution"
       
     return (
        <PageTemplate 
           title={title}
           description="Advanced technology solution."
           badge="Solutions"
           type="tech"
        />
     )
  }

  const title = content?.title || navData?.title || slug
  const description = content?.description || `State-of-the-art ${title} solutions.`
  const badge = content?.badge || navData?.category || "Solutions"
  // Map scene to supported types: 'orb' | 'grid' | 'city' | 'shield' | 'server' | 'tech'
  const type = (['orb', 'grid', 'city', 'shield', 'server'].includes(content?.scene || '') ? content?.scene : 'tech') as any

  return (
    <PageTemplate 
      title={title}
      description={description}
      badge={badge}
      type={type}
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Overview */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
           <p className="lead text-xl text-muted-foreground">{content?.overview}</p>
        </div>

        {/* Feature Grid */}
        {content?.features && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {content.features.map((feature: any, i: number) => (
               <div key={i} className="p-6 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors group">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {i === 0 ? '⚡' : i === 1 ? '🛡️' : '🔗'}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
               </div>
            ))}
          </div>
        )}

        {/* Technical Specs */}
        {content?.technicalSpecs && (
           <div className="bg-secondary/5 rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <span>🛠️</span> Technical Capabilities
              </h3>
              <div className="flex flex-wrap gap-3">
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
