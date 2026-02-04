import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroGlobe } from "@/components/sections/hero-globe"
import { ServicesGrid } from "@/components/sections/services-grid"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroGlobe />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  )
}
