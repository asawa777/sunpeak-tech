import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    category: string
    slug: string
  }
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

export default function SolutionPage({ params }: PageProps) {
  const data = getPageData(params.category, params.slug)
  
  if (!data || !params?.slug) {
    // Basic fallback for development
     const title = params?.slug 
       ? params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
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

  return (
    <PageTemplate 
      title={data.title}
      description={`State-of-the-art ${data.title} solutions for modern businesses.`}
      badge={data.category}
      type="tech"
    />
  )
}
