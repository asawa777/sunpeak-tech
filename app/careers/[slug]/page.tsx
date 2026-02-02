import { PageTemplate } from "@/components/templates/page-template"

interface PageProps { params: Promise<{ slug: string }> }

export default async function CareerPage({ params }: PageProps) {
  const { slug } = await params
  return <PageTemplate title={slug.replace(/-/g, ' ')} badge="Join Us" type="general" />
}
