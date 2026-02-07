import { PageTemplate } from "@/components/templates/page-template";
import { siteConfig } from "@/config/site";
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
  const legalNav = siteConfig.footerNav.legal;
  if (!legalNav) return [];

  return legalNav.map((i) => ({
    slug: i.href.split("/").pop() || "",
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const tLegal = await getTranslations({ locale, namespace: 'legalContent' });
  
  let content: any;
  try { content = tLegal.raw(slug); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: "Legal and Compliance Information",
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });
  const tLegal = await getTranslations({ locale, namespace: 'legalContent' });

  let content: any = null;
  try {
      content = tLegal.raw(slug);
  } catch (error) {
      return notFound();
  }

  if (!content) return notFound();

  return (
    <PageTemplate
      title={content.title}
      description={t('footer.rights')} // Simple fallback description
      badge={t('nav.legal_compliance')} // "Legal & Compliance" key exists in nav? Let's check or fallback
      type="tech"
    >
      <div className="container max-w-4xl mx-auto">
        <div 
            className="prose prose-lg dark:prose-invert max-w-none bg-card p-12 rounded-3xl border border-border shadow-sm"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.content) }} 
        />
      </div>
    </PageTemplate>
  );
}
