import { PageTemplate } from "@/components/templates/page-template"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function NewsLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsContent.landing" });

  const links = t.raw("links") as Array<{ title: string; href: string; desc: string }>;

  return (
    <PageTemplate 
      title={t("title")}
      description={t("description")}
      badge={t("badge")}
      type="city"
    >
      <div className="max-w-4xl mx-auto space-y-12">
         <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">{t("overview")}</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, i) => (
                <Link key={i} href={link.href} className="group p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center">
                     {link.title}
                     <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </h3>
                   <p className="text-muted-foreground">{link.desc}</p>
                </Link>
            ))}
         </div>
      </div>
    </PageTemplate>
  )
}
