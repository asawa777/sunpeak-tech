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
  const t = await getTranslations({ locale, namespace: 'professionalServices' });
  
  let content: any;
  try { content = t.raw(slug); } catch (e) { return {}; }

  if (!content) return {};

  return {
    title: `${content.title} | Sunpeak Tech`,
    description: content.description,
  };
}

export default async function ProfessionalServicePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'professionalServices' });

  let content: any = null;
  try {
      content = t.raw(slug);
  } catch (error) {
      return notFound();
  }

  if (!content) return notFound();

  // Handle features array if exists
  const features = content.features as Array<{ title: string; desc: string }> || [];

  return (
      <PageTemplate 
          title={content.title}
          description={content.description}
          badge={content.badge || "Service"}
          type="grid"
      >
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="prose prose-lg dark:prose-invert">
                <p className="lead text-xl text-muted-foreground">{content.overview}</p>
            </div>
            
            {features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                            <h4 className="font-bold mb-2 text-primary">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            )}
          </div>
      </PageTemplate>
  );
}
