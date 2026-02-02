import { PageTemplate } from "@/components/templates/page-template"

export default function IndustriesPage() {
  return (
    <PageTemplate 
      title="Industries" 
      description="We understand the unique challenges of your sector."
      badge="Deep Domain Knowledge"
      type="tech"
    >
        <div className="prose prose-lg dark:prose-invert max-w-none text-center">
           <p className="lead text-xl text-muted-foreground">
              From Finance to Healthcare, we provide specialized services tailored to the specific regulatory and operational needs of your industry.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mt-12 text-left">
              {['Finance & Banking', 'Government', 'Healthcare', 'Manufacturing', 'Retail', 'Telecommunications'].map((ind) => (
                 <div key={ind} className="p-6 bg-card border border-border rounded-xl">
                    <h3 className="font-bold mb-2">{ind}</h3>
                    <p className="text-sm text-muted-foreground"> specialized compliance and security solutions.</p>
                 </div>
              ))}
           </div>
        </div>
    </PageTemplate>
  )
}
