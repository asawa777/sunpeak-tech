import { PageTemplate } from "@/components/templates/page-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function CareersLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careersContent.landing" });

  const links = t.raw("links") as Array<{ title: string; href: string; desc: string }>;
  const stats = t.raw("mission.stats") as Array<{ value: string; label: string }>;

  return (
    <PageTemplate 
      title={t("title")}
      description={t("description")}
      badge={t("badge")}
      type="city"
    >
      <div className="max-w-4xl mx-auto space-y-24">
         {/* Mission / Intro */}
         <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t("hero.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex justify-center gap-4">
               <Link href="/careers/open-positions">
                 <Button size="lg" className="rounded-full px-8">
                   {t("hero.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
               </Link>
            </div>
         </div>

         {/* Stats / Philosophy */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-secondary/5 p-8 rounded-3xl border border-border">
           <div>
              <h3 className="text-2xl font-bold mb-4">{t("mission.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                 {t("mission.content")}
              </p>
           </div>
           <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                 <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
                 </div>
              ))}
           </div>
         </div>

         {/* Nav Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((item, i) => (
               <Link key={i} href={item.href} className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors flex items-center">
                    {item.title}
                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
               </Link>
            ))}
         </div>
      </div>
    </PageTemplate>
  )
}
