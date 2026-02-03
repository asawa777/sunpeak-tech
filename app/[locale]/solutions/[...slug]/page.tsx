import { PageTemplate } from "@/components/templates/page-template";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react"; // Import CheckCircle2 for features list
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{
    slug: string[];
    locale: string;
  }>;
}

// recursive helper...
export function getPageData(slugs: string[], items: any[] = siteConfig.mainNav): any | null {
  const rootHref = `/${slugs[0]}`; 
  const targetHref = `/solutions/${slugs.join("/")}`;
  
  const findItem = (nodes: any[]): any => {
    for (const node of nodes) {
      if (node.href === targetHref) return node;
      if (node.items) {
        const found = findItem(node.items);
        if (found) return found;
      }
    }
    return null;
  };

  const solutionsNode = siteConfig.mainNav.find(n => n.href === '/solutions');
  if (!solutionsNode || !solutionsNode.items) return null;
  
  return findItem(solutionsNode.items);
}

// Generate params...
export function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  const solutionsNode = siteConfig.mainNav.find(n => n.href === '/solutions');
  if (!solutionsNode || !solutionsNode.items) return [];

  const traverse = (node: any) => {
    if (node.href.startsWith('/solutions/')) {
        const slugStr = node.href.replace('/solutions/', '');
        params.push({ slug: slugStr.split('/') });
    }
    if (node.items) node.items.forEach(traverse);
  };

  solutionsNode.items.forEach(traverse);
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const tServices = await getTranslations({ locale, namespace: 'newServices' });
  const data = getPageData(slug);
  
  if (!data) return {};

  const isLeaf = !data.items || data.items.length === 0;
  const contentKey = slug[slug.length - 1];
  const serviceContent = isLeaf ? tServices.raw(contentKey) : null;
  const hasSpecificContent = serviceContent && serviceContent !== contentKey;

  const title = t(data.title);
  const description = hasSpecificContent ? serviceContent.description : t('servicesPage.description');

  return {
    title: `${title} | Sunpeak Tech`,
    description: description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tServices = await getTranslations({ locale, namespace: 'newServices' });

  const data = getPageData(slug);

  if (!data) {
    return notFound();
  }

  // Determine if this is a leaf node (Service Detail) or Category
  const isLeaf = !data.items || data.items.length === 0;
  
  // Key for translations: use the last segment of the slug
  const contentKey = slug[slug.length - 1]; 
  const serviceContent = isLeaf ? tServices.raw(contentKey) : null;
  const hasSpecificContent = serviceContent && serviceContent !== contentKey; // Check if translation exists

  // Determine 3D Visual Theme based on slug
  const getVisualTheme = (slugKey: string) => {
      // Tech / Grid Theme
      if (['information-technology', 'cyber-security', 'software-programs', 
           'telecom-communication', 'asset-management-system', 'booking-resource-management', 
           'service-feedback-system', 'it-support-maintenance'].some(k => slugKey.includes(k))) return 'tech';
      
      // City / Construction Theme
      if (['construction-interior-decoration', 'smart-building', 'building-construction-renovation', 
           'smart-city-infrastructure', 'mep-systems'].some(k => slugKey.includes(k))) return 'city';
      
      // Orb / Innovation Theme
      if (['research-training', 'research-academic-services', 'innovation-rnd'].some(k => slugKey.includes(k))) return 'orb';

      return 'general';
  };

  const visualType = serviceContent?.scene || getVisualTheme(slug[slug.length-1]);

  return (
    <PageTemplate
      title={t(data.title)}
      description={hasSpecificContent ? serviceContent.description : t('servicesPage.description')}
      badge={hasSpecificContent ? serviceContent.badge : t('servicesPage.badge')}
      type={visualType as any}
    >
      <div className="container max-w-5xl mx-auto">
        
        {/* If Leaf Node: Show Detailed Content */}
        {isLeaf && hasSpecificContent && (
           <div className="space-y-12">
              {/* Overview */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                 <h2 className="text-3xl font-bold mb-6">{t('nav.company_overview')}</h2> 
                 {/* Reusing generic headers or create specific ones */}
                 <p className="lead text-xl text-muted-foreground">{serviceContent.overview}</p>
                 
                 {/* Technical Specs Tags */}
                 {serviceContent.technicalSpecs && (
                    <div className="flex flex-wrap gap-2 my-6">
                        {serviceContent.technicalSpecs.map((spec: string, i: number) => (
                           <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                             {spec}
                           </span>
                        ))}
                    </div>
                 )}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.values(serviceContent.features).map((feature: any, idx: number) => (
                      <div key={idx} className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.desc}</p>
                      </div>
                  ))}
              </div>
           </div>
        )}

        {/* If Category Node: Show Sub-items Grid */}
        {!isLeaf && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {data.items.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {t(item.title)}
                  </h3>
                   {/* Try to peek into sub-item content for description if available */}
                   {/* We construct key from item href last segment */}
                   {(() => {
                       const subKey = item.href.split('/').pop();
                       // Try to get description from newServices if it exists
                       let desc = "";
                       try {
                           // This usage of tServices might throw or return key if not found depending on config.
                           // Safeguard access
                           const content = tServices.raw(subKey);
                           if (content && content.description) desc = content.description;
                       } catch(e) {}
                       
                       return (
                         <p className="text-sm text-muted-foreground mb-4">
                            {desc || t('servicesGrid.learn_more')}
                         </p>
                       )
                   })()}

                </div>
                <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                  {t('servicesGrid.learn_more')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State / Fallback */}
        {(!isLeaf && (!data.items || data.items.length === 0)) && (
             <div className="p-12 text-center">
                 <p className="text-muted-foreground">Content under development.</p>
             </div>
        )}

      </div>
    </PageTemplate>
  );
}
