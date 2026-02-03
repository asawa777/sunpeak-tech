import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function SolutionsPage() {
  const solutions = siteConfig.mainNav.find(n => n.title === "Solutions & Products")

  return (
    <PageTemplate 
      title="Solutions" 
      description="Tailored technology strategies for your industry."
      badge="Industry Focused"
      type="tech"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {solutions?.items?.map((item) => (
             ('items' in item && item.items) ? (
                 item.items.map(subItem => (
                    <Link key={subItem.title} href={subItem.href} className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                       <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center">
                         {subItem.title}
                         <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </h3>
                       <p className="text-muted-foreground text-sm">Enterprise-grade {subItem.title.toLowerCase()} solution.</p>
                    </Link>
                 ))
             ) : null
         ))}
      </div>
    </PageTemplate>
  )
}
