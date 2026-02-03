import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/templates/page-template";

interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careersContent' });
  
  let content: any;
  try { content = t.raw(`pages.${slug}`); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: content.description,
  };
}

export default async function CareerSubPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careersContent' });

  let content: any = null;
  try {
      content = t.raw(`pages.${slug}`);
  } catch (error) {
      return notFound();
  }

  if (!content) return notFound();

  return (
      <PageTemplate 
          title={content.title}
          description={content.description}
          badge={content.badge || "Careers"}
          type="city"
      >
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="prose prose-lg dark:prose-invert">
                <p className="lead text-xl text-muted-foreground">{content.overview}</p>
                {/* Handle Pillars (Why Work With Us) */}
                {content.pillars && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-8">
                      {content.pillars.map((item: any, i: number) => (
                         <div key={i} className="p-6 bg-card border border-border rounded-xl">
                            <h4 className="font-bold mb-2">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                         </div>
                      ))}
                   </div>
                )}
                
                {/* Handle Jobs (Open Positions) */}
                 {content.jobs && (
                   <div className="space-y-4 not-prose mt-8">
                      {content.jobs.map((job: any, i: number) => (
                         <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-card border border-border rounded-xl">
                            <div>
                                <h4 className="font-bold text-lg">{job.title}</h4>
                                <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                                   <span>{job.category}</span>
                                   <span>•</span>
                                   <span>{job.type}</span>
                                   <span>•</span>
                                   <span>{job.location}</span>
                                </div>
                            </div>
                            <button className="mt-4 md:mt-0 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors text-sm font-medium">
                               Apply Now
                            </button>
                         </div>
                      ))}
                   </div>
                )}

                {/* Handle Programs (Internships) */}
                {content.programs && (
                   <div className="space-y-6 not-prose mt-8">
                      {content.programs.map((prog: any, i: number) => (
                         <div key={i} className="p-6 bg-secondary/5 border-l-4 border-primary rounded-r-xl">
                            <h4 className="font-bold text-lg mb-2">{prog.title}</h4>
                            <p className="text-muted-foreground">{prog.desc}</p>
                         </div>
                      ))}
                   </div>
                )}
                 {/* Handle Values (Life at Sunpeak) */}
                {content.values && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-8">
                      {content.values.map((val: any, i: number) => (
                         <div key={i} className="text-center p-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary font-bold text-xl">{i+1}</div>
                            <h4 className="font-bold mb-2">{val.title}</h4>
                            <p className="text-sm text-muted-foreground">{val.desc}</p>
                         </div>
                      ))}
                   </div>
                )}

            </div>
          </div>
      </PageTemplate>
  );
}
