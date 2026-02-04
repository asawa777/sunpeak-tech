import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Gauge, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

export default function ServicePage({ params }: { params: { slug: string } }) {
  const t = useTranslations('newServices');
  const slug = params.slug;

  const validSlugs = ['it-infrastructure', 'cyber-security', 'software-engineering', 'smart-systems', 'managed-services'];

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // Helper to get array from translation
  const getFeatures = () => {
    try {
      const features = [];
      for (let i = 0; i < 3; i++) {
        features.push({
          title: t(`${slug}.features.${i}.title`),
          desc: t(`${slug}.features.${i}.desc`)
        });
      }
      return features;
    } catch (e) {
      return [];
    }
  };

  const getSpecs = () => {
     try {
        return [
           t(`${slug}.technicalSpecs.0`),
           t(`${slug}.technicalSpecs.1`),
           t(`${slug}.technicalSpecs.2`)
        ];
     } catch(e) {
        return [];
     }
  }

  const features = getFeatures();
  const specs = getSpecs();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30 border-b">
        <div className="container px-4">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              {t(`${slug}.badge`)}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t(`${slug}.title`)}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              {t(`${slug}.description`)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>{t(`${slug}.overview`)}</p>
                
                {/* Dynamic Content Sections */}
                {(() => {
                    try {
                        const rawSections = t.raw(`${slug}.sections`);
                        if (Array.isArray(rawSections)) {
                            return rawSections.map((section: any, idx: number) => (
                                <div key={idx} className="mt-8">
                                    {section.title && <h3 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h3>}
                                    <div className="prose prose-muted dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content) }} />
                                </div>
                            ));
                        }
                    } catch (e) { return null; }
                })()}
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium bg-secondary/10 p-3 rounded-lg border border-secondary/20">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {spec}
                    </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 group">
                  <div className="mb-4 p-3 w-fit rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {index === 0 ? <Gauge className="h-6 w-6" /> : index === 1 ? <Shield className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to upgrade your infrastructure?</h2>
            <p className="text-lg opacity-90 mb-8">
              Schedule a consultation with our experts today.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
