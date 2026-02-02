import { PageTemplate } from "@/components/templates/page-template"

interface PageProps { params: { slug: string } }

export default function ServicePage({ params }: PageProps) {
  return <PageTemplate title={params.slug.replace(/-/g, ' ')} badge="Service" type="tech" />
}
