import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesGrid } from "@/components/sections/services-grid"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  )
}
