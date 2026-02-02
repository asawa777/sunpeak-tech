import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"

interface PageProps {
  params: {
    slug: string
  }
}

function getData(slug: string) {
  const path = `/projects/${slug}`
  const section = siteConfig.mainNav.find(n => n.title === "Projects")
  return section?.items?.find(i => i.href === path)
}

export function generateStaticParams() {
   const section = siteConfig.mainNav.find(n => n.title === "Projects")
   return section?.items?.map(i => ({ slug: i.href.split('/').pop() })) || []
}

export default function ProjectPage({ params }: PageProps) {
  const data = getData(params.slug)
  if (!data) return <PageTemplate title={params.slug} type="general" />

  return (
    <PageTemplate 
      title={data.title}
      description={`Explore our successful implementations in ${data.title}.`}
      badge="Case Study"
      type="tech"
    />
  )
}
