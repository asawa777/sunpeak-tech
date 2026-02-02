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
  const content = solutionsContent[slug as keyof typeof solutionsContent]
  
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
  // Map scene to type or handle generically. simplified for now to "tech" or "general"
  const type = (content?.scene === 'shield' ? 'security' : 'tech') as any

  return (
    <PageTemplate 
      title={title}
      description={description}
      badge={badge}
      type={type}
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        
        {content?.features && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-12">
            {content.features.map((feature: string) => (
               <div key={feature} className="flex items-center p-4 bg-card border border-border rounded-xl shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-bold">
                    ⚡
                  </div>
                  <span className="font-medium">{feature}</span>
               </div>
            ))}
          </div>
        )}

        {content?.content ? (
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        ) : (
           <p>Detailed information about {title} is coming soon.</p>
        )}
      </div>
    </PageTemplate>
  )
}
