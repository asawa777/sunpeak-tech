import { PageTemplate } from "@/components/templates/page-template"
import { careersPages } from "@/config/careers-content"

export function generateStaticParams() {
  return Object.keys(careersPages).map((slug) => ({
    slug: slug,
  }))
}

interface PageProps { params: Promise<{ slug: string }> }

export default async function CareerPage({ params }: PageProps) {
  const { slug } = await params
  if (!careersPages[slug as keyof typeof careersPages]) return null
  return <PageTemplate title={slug.replace(/-/g, ' ')} badge="Join Us" type="general" />
}
