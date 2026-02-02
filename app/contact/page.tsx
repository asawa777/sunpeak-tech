import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/sections/page-header"
import { ContactForm } from "@/components/sections/contact-form"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader 
          title="Contact Us" 
          description="Let's discuss how we can help your business grow with our advanced technology solutions."
          badge="24/7 Support"
        />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
