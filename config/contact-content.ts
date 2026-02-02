export const contactLanding = {
  title: "Contact Sunpeak Tech",
  description: "Let's start a conversation. Whether you need a consultation, support, or partnership, we're here to help.",
  badge: "Get in Touch",
  hero: {
    title: "How can we help?",
    subtitle: "We believe in clear communication and lasting partnerships. Reach out to our team in Bangkok for local support with global expertise.",
    actions: [
      { label: "Request Consultation", href: "/contact/request-a-consultation", primary: true },
      { label: "General Inquiry", href: "/contact/contact-information", primary: false },
       { label: "Partner with Us", href: "/contact/partner-with-us", primary: false }
    ]
  },
  scene: "city"
}

export const contactPages = {
  "contact-information": {
    title: "Contact Information",
    description: "Reach us directly via phone, email, or visit our headquarters.",
    badge: "Direct Contact",
    overview: "We are available during Thailand business hours (GMT+7). For urgent technical support, please use our dedicated client portal.",
    details: [
      { label: "Email", value: "sunpeaktech.th@gmail.com", type: "email" },
      { label: "Phone", value: "(+66) 96-919-9797", type: "phone" },
      { label: "Business Hours", value: "Mon-Fri, 9:00 AM - 6:00 PM (GMT+7)", type: "text" }
    ],
    scene: "grid"
  },
  "request-a-consultation": {
    title: "Request a Consultation",
    description: "Schedule a free exploratory session with our solution architects.",
    badge: "Consultation",
    overview: "Tell us about your project. We'll match you with a specialist who understands your industry, not a salesperson.",
    consultationTypes: [
      "IT & Digital Solutions",
      "System & Software Integration",
      "Cybersecurity Assessment",
      "Telecom & Infrastructure",
      "Construction & Smart Building"
    ],
    formNote: "Your information is kept strictly confidential. We do not share data with third parties.",
    scene: "orb"
  },
  "partner-with-us": {
    title: "Partner with Us",
    description: "Join our ecosystem of technology vendors, integrators, and academic institutions.",
    badge: "Partnership",
    overview: "We build long-term strategic alliances. We are looking for partners who share our commitment to quality, innovation, and ethical engineering.",
    partnerTypes: [
      { title: "Technology Vendors", desc: "Hardware and software providers looking for a certified integration partner." },
      { title: "System Integrators", desc: "Firms seeking specialized expertise in cybersecurity or complex infrastructure." },
      { title: "Research Institutes", desc: "Universities and labs for joint R&D initiatives." }
    ],
    scene: "shield"
  },
  "office-locations": {
    title: "Office Locations",
    description: "Visit our headquarters in Bangkok, Thailand.",
    badge: "Locations",
    overview: "Our team is locally grounded in Bangkok to provide rapid on-site support for clients across Thailand and Southeast Asia.",
    locations: [
      { 
        city: "Bangkok", 
        country: "Thailand", 
        address: "123 Tech Tower, Sukhumvit Road, Watthana, Bangkok 10110",
        map: "bangkok-map-placeholder" 
      }
    ],
    scene: "city"
  }
}
