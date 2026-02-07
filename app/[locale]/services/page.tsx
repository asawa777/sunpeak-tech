import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"
import { ServicesGrid } from "@/components/sections/services-grid"
import { useTranslations } from "next-intl"

export default function ServicesPage() {
  const t = useTranslations('servicesPage')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title={t('title')}
          description={t('description')}
          badge={t('badge')}
        />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  )
}
