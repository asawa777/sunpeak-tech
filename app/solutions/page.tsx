import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Solutions" 
          description="Tailored technology strategies for your industry."
          badge="Industry Focused"
        />
        <div className="py-24 text-center text-muted-foreground">
           <p>Creating specialized solutions for Enterprise, Government, and Healthcare...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
