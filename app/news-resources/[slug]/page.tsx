import { newsContent } from "@/config/news-content"
import { siteConfig } from "@/config/site"
import { notFound } from "next/navigation"
import { PageTemplate } from "@/components/templates/page-template"

interface PageProps { params: Promise<{ slug: string }> }

function getData(slug: string) {
  const path = `/news-resources/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "News")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "News")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params
  const navData = getData(slug)
  const content = newsContent[slug as keyof typeof newsContent] as any

  if (!content && !navData) return <PageTemplate title={slug} type="general" />

  const title = content?.title || navData?.title || slug
  const description = content?.description || `Industry ${title}.`
  const badge = content?.badge || "News"
  const type = (['city', 'shield', 'orb', 'grid'].includes(content?.scene || '') ? content?.scene : 'general') as any

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

         {/* Timeline (News) */}
         {content?.timeline && (
            <div className="border-l-2 border-primary/20 pl-8 space-y-12">
               {content.timeline.map((event: any, i: number) => (
                  <div key={i} className="relative">
                     <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                     <div className="text-sm font-bold text-primary mb-1">{event.date}</div>
                     <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                     <p className="text-muted-foreground">{event.desc}</p>
                  </div>
               ))}
            </div>
         )}
         
         {/* Resource Grid (Whitepapers) */}
         {content?.resources && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.resources.map((doc: any, i: number) => (
                   <div key={i} className="flex items-start p-6 bg-secondary/5 rounded-xl border border-border group cursor-pointer hover:border-primary/50 transition-colors">
                      <div className="mr-4 text-3xl">📄</div>
                      <div className="flex-1">
                         <div className="text-xs font-bold text-muted-foreground uppercase mb-1">{doc.type}</div>
                         <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                         <div className="text-xs text-muted-foreground">{doc.size} • PDF</div>
                      </div>
                      <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">⬇️</div>
                   </div>
                ))}
            </div>
         )}

         {/* Upcoming Events */}
         {content?.upcoming && (
             <div className="space-y-4">
               {content.upcoming.map((event: any, i: number) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-card border border-border rounded-xl">
                      <div className="shrink-0 w-16 text-center">
                         <div className="text-xs font-bold uppercase text-muted-foreground">{event.date.split(' ')[0]}</div>
                         <div className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</div>
                      </div>
                      <div className="flex-1">
                         <h3 className="text-lg font-bold">{event.title}</h3>
                         <div className="text-sm text-muted-foreground">📍 {event.location}</div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary/5">
                         Register
                      </button>
                  </div>
               ))}
             </div>
         )}

         {/* FAQs */}
         {content?.faqs && (
            <div className="space-y-4">
               {content.faqs.map((faq: any, i: number) => (
                  <div key={i} className="p-6 bg-secondary/5 rounded-xl border border-border">
                     <h3 className="font-bold mb-3 flex items-start gap-3">
                        <span className="text-primary">Q.</span> {faq.q}
                     </h3>
                     <p className="text-muted-foreground pl-7">{faq.a}</p>
                  </div>
               ))}
            </div>
         )}

         {/* Featured Articles */}
         {content?.featured && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {content.featured.map((article: any, i: number) => (
                  <div key={i} className="block group">
                     <div className="aspect-video bg-secondary/10 rounded-xl mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-xs font-bold text-white px-2 py-1 bg-black/50 backdrop-blur rounded">
                           {article.category}
                        </span>
                     </div>
                     <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                     </h3>
                  </div>
               ))}
            </div>
         )}
      </div>
    </PageTemplate>
  )
}
