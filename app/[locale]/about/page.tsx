import { PageTemplate } from "@/components/templates/page-template"
import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations('aboutPage')

  return (
    <PageTemplate 
      title={t('title')}
      description={t('description')}
      badge={t('badge')}
      type="general"
    >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">
              {t('content.p1')}
          </p>
          <p>
              {t('content.p2')}
          </p>
          <p>
              {t('content.p3')}
          </p>
        </div>
    </PageTemplate>
  )
}
