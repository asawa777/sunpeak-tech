import { PageTemplate } from "@/components/templates/page-template"
import { siteConfig } from "@/config/site"

interface PageProps {
  params: {
    slug: string
  }
}

// Map the folder name to the config title
const sections = {
   'about': 'About Us',
   'professional-services': 'Services',
   'news-resources': 'News',
   'careers': 'Careers'
}

export function generateStaticParams() {
   // This is a simplified generator for the specific folder this file lands in
   // Since we reuse this code, we'll keep it simple for now or copy-paste
   return [] 
}

export default function GenericPage({ params }: PageProps) {
  // We need to know which section we are in based on the file location
  // But since this code is reused, let's just use the slug to find roughly
  // In a real app we'd pass the section context or use getStaticProps more effectively
  
  return (
    <PageTemplate 
      title={params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
      description="Detailed information about this specific area."
      badge="Info"
      type="general"
    />
  )
}
