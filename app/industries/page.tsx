import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"

export default function IndustriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Industries" 
          description="We understand the unique challenges of your sector."
          badge="Deep Domain Knowledge"
        />
        <div className="py-24 text-center text-muted-foreground">
           <p>Providing specialized services for Finance, Manufacturing, Telecom, and more...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
