import { sectionLandingContent } from "@/config/new-services-content"
import { PageTemplate } from "@/components/templates/page-template"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ProfServicesLandingPage() {
  const content = sectionLandingContent["professional-services"]

  return (
    <PageTemplate 
      title={content.title}
      description={content.description}
      badge={content.badge}
      type={content.scene as any}
    >
      <div className="max-w-4xl mx-auto space-y-12">
         <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">{content.overview}</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.links.map((link, i) => (
                <Link key={i} href={link.href} className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center">
                     {link.title}
                     <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </h3>
                   <p className="text-muted-foreground">{link.desc}</p>
                </Link>
            ))}
         </div>
      </div>
    </PageTemplate>
  )
}
