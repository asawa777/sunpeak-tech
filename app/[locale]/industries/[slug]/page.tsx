import { PageTemplate } from "@/components/templates/page-template";
import { siteConfig } from "@/config/site";
import { CheckCircle2, ShieldCheck, TrendingUp, Lightbulb } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import DOMPurify from 'isomorphic-dompurify';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export function generateStaticParams() {
  const industriesNav = siteConfig.mainNav.find((n) => n.href === "/industries");
  if (!industriesNav || !industriesNav.items) return [];

  return industriesNav.items.map((i) => ({
    slug: i.href.split("/").pop() || "",
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const tIndustries = await getTranslations({ locale, namespace: 'industriesContent' });
  
  let content: any;
  try { content = tIndustries.raw(slug); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: content.description,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });
  const tIndustries = await getTranslations({ locale, namespace: 'industriesContent' });

  // Verify slug exists in industriesContent
  let content: any = null;
  try {
      content = tIndustries.raw(slug);
  } catch (error) {
      return notFound();
  }

  if (!content) return notFound();

  return (
    <PageTemplate
      title={content.title}
      description={content.description}
      badge={content.badge}
      type="tech"
    >
      <div className="container max-w-5xl mx-auto space-y-16">
        
        {/* Overview Section */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
           <h2 className="text-3xl font-bold mb-6">{t('nav.company_overview')}</h2>
           <p className="lead text-xl text-muted-foreground">{content.overview}</p>
           
           {/* Dynamic Content Sections */}
           {content.sections && content.sections.map((section: any, idx: number) => (
              <div key={idx} className="mt-8">
                  {section.title && <h3 className="text-2xl font-bold mb-4">{section.title}</h3>}
                  <div className="prose prose-muted dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
           ))}
           {content.content && <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.content) }} />}
        </div>

        {/* Industry Challenges Grid */}
        <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                {locale === 'th' ? "ความท้าทายในอุตสาหกรรม" : "Key Challenges"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.challenges && content.challenges.map((challenge: any, idx: number) => (
                    <div key={idx} className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold mb-3 text-foreground">{challenge.title}</h3>
                        <p className="text-muted-foreground text-sm">{challenge.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Our Solutions Section */}
        <div className="bg-secondary/5 rounded-3xl p-8 border border-border">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-primary" />
                 {locale === 'th' ? "โซลูชันของเรา" : "Our Solutions"}
            </h2>
            <div className="flex flex-wrap gap-4">
                {content.solutions && content.solutions.map((sol: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-background px-6 py-4 rounded-xl border border-border shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="font-semibold">{sol}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </PageTemplate>
  );
}
