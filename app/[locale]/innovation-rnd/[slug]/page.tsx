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
  const t = await getTranslations({ locale, namespace: 'innovationContent' });
  
  let content: any;
  try { content = t.raw(slug); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: content.description,
  };
}

export default async function InnovationPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'innovationContent' });

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
          badge={content.badge || "Innovation"}
          type="orb"
      >
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="prose prose-lg dark:prose-invert">
                <p className="lead text-xl text-muted-foreground">{content.overview}</p>
                 {content.content && <p>{content.content}</p>}
            </div>
          </div>
      </PageTemplate>
  );
}
