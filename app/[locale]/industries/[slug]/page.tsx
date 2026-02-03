import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function getData(slug: string) {
  const path = `/industries/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "Industries")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "Industries")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

import { industriesContent } from "@/config/industries-content"

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params
  const navData = getData(slug)
  const content = industriesContent[slug as keyof typeof industriesContent]

  if (!content && !navData) return <PageTemplate title={slug} type="general" />

  const title = content?.title || navData?.title || slug
  const description = content?.description || `Specialized IT solutions for the ${title} sector.`
  const badge = content?.badge || "Industry Focus"
  const type = (content?.scene === 'shield' ? 'security' : 'general') as any

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
                  <div className="h-8 w-8 rounded-full bg-secondary/10 text-secondary-foreground flex items-center justify-center mr-4 font-bold">
                    🏢
                  </div>
                  <span className="font-medium">{feature}</span>
               </div>
            ))}
          </div>
        )}

        {content?.content ? (
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        ) : (
           <p>Detailed industry insights for {title} coming soon.</p>
        )}
      </div>
    </PageTemplate>
  )
}
