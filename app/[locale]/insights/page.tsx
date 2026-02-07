import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Insights" 
          description="Latest trends, news, and technical articles."
          badge="Knowledge Hub"
        />
        <div className="py-24 text-center text-muted-foreground">
           <p>Coming soon: In-depth articles on Cyber Security, Cloud Computing, and AI...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
