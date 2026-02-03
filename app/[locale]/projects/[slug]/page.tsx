import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/templates/page-template";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projectsContent' });
  
  let content: any;
  try { content = t.raw(slug); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: content.description,
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projectsContent' });

  let content: any = null;
  try {
      content = t.raw(slug);
  } catch (error) {
      return notFound();
  }

  if (!content) return notFound();

  // Handle challenge/solution/result structure if needed
  const details = [
     { label: "Challenge", text: content.challenge },
     { label: "Solution", text: content.solution },
     { label: "Result", text: content.result }
  ].filter(d => d.text);

  // Determine Visual Theme
  const getVisualTheme = (s: string) => {
     if (content?.scene) return content.scene; // Allow override from JSON
     if (s.includes('construction') || s.includes('smart-building') || s.includes('infrastructure')) return 'city';
     if (s.includes('tech') || s.includes('digital') || s.includes('telecom') || s.includes('cyber') || s.includes('security')) return 'tech';
     return 'orb';
  }

  return (
      <PageTemplate 
          title={content.title}
          description={content.description}
          badge={content.badge || "Case Study"}
          type={getVisualTheme(slug) as any}
      >
          <div className="max-w-4xl mx-auto space-y-12">
             <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
             </Link>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 prose prose-lg dark:prose-invert">
                        <p className="lead text-xl text-muted-foreground">{content.overview}</p>
                        {content.content && <div dangerouslySetInnerHTML={{ __html: content.content }} />}
                    </div>
                
                <div className="space-y-8">
                   {details.length > 0 && (
                       <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                           {details.map((item, i) => (
                               <div key={i}>
                                   <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">{item.label}</h4>
                                   <p>{item.text}</p>
                               </div>
                           ))}
                       </div>
                   )}
                   
                   {content.techStack && (
                       <div className="bg-secondary/5 rounded-xl p-6">
                           <h4 className="font-bold mb-4">Tech Stack</h4>
                           <div className="flex flex-wrap gap-2">
                               {content.techStack.map((tech: string) => (
                                   <span key={tech} className="px-3 py-1 bg-background border border-border rounded-full text-xs font-medium">
                                       {tech}
                                   </span>
                               ))}
                           </div>
                       </div>
                   )}
                </div>
             </div>
          </div>
      </PageTemplate>
  );
}
