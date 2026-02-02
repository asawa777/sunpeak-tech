import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="About Sunpeak Tech" 
          description="A leading provider of IT infrastructure, security, and smart systems."
          badge="Our Story"
        />
        <section className="py-16 md:py-24">
           <div className="container px-4 max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                 <strong className="text-foreground">Sunpeak Tech</strong> was founded with a mission to bridge the gap between complex technology and business efficiency. We believe that technology should be an enabler, not a bottleneck.
              </p>
              <p>
                 Our team of certified experts brings decades of experience in Network Systems, Cyber Security, and Software Engineering. We partner with industry leaders to deliver enterprise-grade solutions to businesses of all sizes.
              </p>
              <p>
                 From modernizing data centers to securing critical assets and enabling smart building automation, our comprehensive portfolio ensures that we are the only technology partner you will ever need.
              </p>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
