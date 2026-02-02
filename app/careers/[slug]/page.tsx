import { PageTemplate } from "@/components/templates/page-template"

interface PageProps { params: { slug: string } }

export default function CareerPage({ params }: PageProps) {
  return <PageTemplate title={params.slug.replace(/-/g, ' ')} badge="Join Us" type="general" />
}
