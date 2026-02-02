import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Sunpeak Tech
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Empowering businesses with advanced technology solutions. We deliver secure, scalable, and smart infrastructure for the modern enterprise.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
             <h3 className="font-semibold mb-4">Services</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services/it-infrastructure" className="hover:text-primary transition-colors">IT Infrastructure</Link></li>
                <li><Link href="/services/cyber-security" className="hover:text-primary transition-colors">Cyber Security</Link></li>
                 <li><Link href="/services/software-engineering" className="hover:text-primary transition-colors">Software Engineering</Link></li>
                 <li><Link href="/services/managed-services" className="hover:text-primary transition-colors">Managed Services</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="font-semibold mb-4">Company</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about/company" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/about/our-team" className="hover:text-primary transition-colors">Our Team</Link></li>
                <li><Link href="/about/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
             </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Tech Avenue, Silicon Valley, CA 94000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@sunpeak.tech" className="hover:text-primary">info@sunpeak.tech</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sunpeak Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
