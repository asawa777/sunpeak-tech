import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Case Studies" 
          description="Real-world examples of our success."
          badge="Our Work"
        />
        <div className="py-24 text-center text-muted-foreground">
           <p>Explore how we helped clients transform their IT infrastructure...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
