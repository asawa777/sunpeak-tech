import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"
import { ServicesGrid } from "@/components/sections/services-grid"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Our Services" 
          description="We offer a comprehensive suite of IT solutions to drive your digital transformation."
          badge="Expertise"
        />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  )
}
