import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutSubPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('aboutPage');
  const slug = params.slug;

  const validSlugs = ['company-overview', 'vision-mission', 'management-team', 'certifications-standards', 'partners-alliances'];

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // Construct keys dynamically
  // Note: This relies on the structure set in messages/xx.json
  
  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const badge = t(`${slug}.badge`);
  
  // Content rendering based on slug type
  // This is a bit complex because the JSON structure varies (content string vs object vs array)
  // We can render specific components based on slug check.

  const renderContent = () => {
    if (slug === 'company-overview') {
        return (
            <div className="grid md:grid-cols-2 gap-12">
                <div className="prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: t.raw(`${slug}.content`) }} />
                <div className="grid grid-cols-2 gap-6">
                    {t.raw(`${slug}.stats`).map((stat: any, i: number) => (
                        <div key={i} className="p-6 bg-card rounded-xl border text-center">
                            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (slug === 'vision-mission') {
        return (
             <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: t.raw(`${slug}.content`) }} />
        );
    }

    if (slug === 'management-team') {
        const team = t.raw(`${slug}.team`);
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member: any, i: number) => (
                    <div key={i} className="bg-card p-6 rounded-xl border hover:shadow-md transition-all">
                        <div className="w-20 h-20 bg-primary/10 rounded-full mb-4 mx-auto flex items-center justify-center text-2xl font-bold text-primary">
                            {member.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-bold text-center">{member.name}</h3>
                        <div className="text-primary text-sm text-center mb-4">{member.role}</div>
                        <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                    </div>
                ))}
            </div>
        );
    }
    
    if (slug === 'certifications-standards') {
         const certs = t.raw(`${slug}.certs`);
         return (
             <div className="grid md:grid-cols-2 gap-6">
                 {certs.map((cert: any, i: number) => (
                     <div key={i} className="flex gap-4 p-6 bg-card rounded-xl border">
                         <div className="p-3 bg-primary/10 h-fit rounded-lg">
                             <CheckCircle2 className="h-6 w-6 text-primary" />
                         </div>
                         <div>
                             <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                             <p className="text-muted-foreground">{cert.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
         );
    }

    if (slug === 'partners-alliances') {
        const partners = t.raw(`${slug}.partners`);
        return (
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {partners.map((partner: any, i: number) => (
                    <div key={i} className="p-6 bg-card rounded-xl border text-center flex flex-col items-center justify-center hover:border-primary/50 transition-colors">
                        <h3 className="font-bold text-lg">{partner.name}</h3>
                         <span className="text-xs px-2 py-1 bg-secondary rounded-full mt-2">{partner.tier}</span>
                    </div>
                ))}
            </div>
        );
    }

    return null;
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-muted/30 border-b">
        <div className="container px-4 text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              {badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              {description}
            </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
             {renderContent()}
        </div>
      </section>
      
      <section className="py-20 border-t">
        <div className="container px-4 text-center">
             <h2 className="text-2xl font-bold mb-6">Interested in learning more?</h2>
             <div className="flex justify-center gap-4">
                 <Button asChild>
                     <Link href="/contact">Contact Us</Link>
                 </Button>
                 <Button variant="outline" asChild>
                     <Link href="/services">View Services</Link>
                 </Button>
             </div>
        </div>
      </section>
    </div>
  );
}
