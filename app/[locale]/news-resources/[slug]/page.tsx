import { getTranslations } from "next-intl/server";
import DOMPurify from 'isomorphic-dompurify';
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
  const t = await getTranslations({ locale, namespace: 'newsContent' });
  
  let content: any;
  try { content = t.raw(slug); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: content.description,
  };
}

export default async function NewsSubPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'newsContent' });

  let content: any = null;
  try {
      content = t.raw(slug);
  } catch (error) {
      return notFound();
  }

  if (!content) return notFound();

  return (
      <PageTemplate 
          title={content.title}
          description={content.description}
          badge={content.badge || "News"}
          type="city"
      >
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="prose prose-lg dark:prose-invert">
                {/* Check if content is string or object/array */}
                {typeof content.content === 'string' ? (
                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.content) }} />
                ) : (
                   <p className="lead text-xl text-muted-foreground">{content.overview}</p>
                )}

                {/* Handle FAQs if present */}
                {content.faqs && (
                   <div className="space-y-4 not-prose mt-8">
                      {content.faqs.map((faq: any, i: number) => (
                         <div key={i} className="p-6 bg-card border border-border rounded-xl">
                            <h4 className="font-bold mb-2 text-primary">{faq.question}</h4>
                            <p className="text-muted-foreground">{faq.answer}</p>
                         </div>
                      ))}
                   </div>
                )}
            </div>
          </div>
      </PageTemplate>
  );
}
