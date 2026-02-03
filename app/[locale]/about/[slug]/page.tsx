import { PageTemplate } from "@/components/templates/page-template"
import { aboutContent } from "@/config/about-content"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
   return Object.keys(aboutContent).map(slug => ({ slug }))
}

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params
  const content = aboutContent[slug as keyof typeof aboutContent]
  
  if (!content) {
    return (
      <PageTemplate 
        title={slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
        description="Detailed information about this specific area."
        badge="Info"
        type="general"
      />
    )
  }
  
  return (
    <PageTemplate 
      title={content.title}
      description={content.description}
      badge={content.badge}
      type="general"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {'content' in content && content.content && <div dangerouslySetInnerHTML={{ __html: content.content }} />}
        
        {'stats' in content && content.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16 not-prose">
            {content.stats.map((stat: any) => (
              <div key={stat.label} className="text-center p-6 bg-secondary/5 rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {'team' in content && content.team && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            {content.team.map((member: any) => (
              <div key={member.name} className="p-8 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <div className="text-primary font-medium mb-4">{member.role}</div>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        )}

        {'certs' in content && content.certs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
            {content.certs.map((cert: any) => (
              <div key={cert.title} className="flex gap-4 p-6 bg-primary/5 border border-primary/10 rounded-xl">
                <div className="h-10 w-10 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">✓</div>
                <div>
                  <h4 className="font-bold mb-1">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {'partners' in content && content.partners && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-12 not-prose">
            {content.partners.map((partner: any) => (
              <div key={partner.name} className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl text-center">
                <div className="text-xl font-bold mb-2">{partner.name}</div>
                <div className="text-xs text-primary font-semibold uppercase tracking-widest">{partner.tier}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTemplate>
  )
}
