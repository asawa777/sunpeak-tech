import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    category: string
  }>
}

function getCategoryData(slug: string) {
  const solutions = siteConfig.mainNav.find(n => n.title === "Solutions & Products")
  const path = `/solutions/${slug}`
  return solutions?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const solutions = siteConfig.mainNav.find(n => n.title === "Solutions & Products")
   return solutions?.items?.map(i => ({ category: i.href.split('/').pop() })) || []
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const data = getCategoryData(category)
  
  if (!data) {
     return notFound()
  }

  // Get items if they exist
  const subItems = 'items' in data ? (data.items as any[]) : []

  return (
    <PageTemplate 
      title={data.title}
      description={`Explore our comprehensive ${data.title} services designed to empower your business.`}
      badge="Solution Category"
      type="tech"
    >
      <div className="container max-w-5xl mx-auto">
         {/* Introduction */}
         <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p className="lead text-xl text-muted-foreground">
               We offer a wide range of specialized services under <strong>{data.title}</strong>. 
               Browse through our capabilities below to find the specific solution that matches your needs.
            </p>
         </div>

         {/* Sub-items Grid */}
         {subItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {subItems.map((item) => (
                  <Link 
                     key={item.href} 
                     href={item.href}
                     className="group flex flex-col p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                     <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                           {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                           Click to learn more about our {item.title} services.
                        </p>
                     </div>
                     <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                        View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                     </div>
                  </Link>
               ))}
            </div>
         ) : (
            <div className="p-8 text-center bg-secondary/5 rounded-xl border border-dashed border-border">
               <p className="text-muted-foreground">No specific services found for this category at the moment.</p>
            </div>
         )}
      </div>
    </PageTemplate>
  )
}
