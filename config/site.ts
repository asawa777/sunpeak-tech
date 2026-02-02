export type NavItem = {
  title: string
  href: string
  items?: NavItem[]
}

export const siteConfig = {
  name: "Sunpeak Tech",
  description: "Advanced IT Solutions & Services",
  mainNav: [
    {
      title: "About Us",
      href: "/about",
      items: [
        { title: "Company Overview", href: "/about/company-overview" },
        { title: "Vision & Mission", href: "/about/vision-mission" },
        { title: "Management & Team", href: "/about/management-team" },
        { title: "Certifications & Standards", href: "/about/certifications-standards" },
        { title: "Partners & Alliances", href: "/about/partners-alliances" },
      ]
    },
    {
      title: "Solutions & Products",
      href: "/solutions",
      items: [
        {
          title: "Information Technology",
          href: "/solutions/information-technology",
          items: [
             { title: "Application & Database Systems", href: "/solutions/information-technology/application-database-systems" },
             { title: "Data Center & Disaster Recovery", href: "/solutions/information-technology/data-center-disaster-recovery" },
             { title: "NOC & SOC Operations", href: "/solutions/information-technology/noc-soc-operations" },
             { title: "Audio-Visual Systems", href: "/solutions/information-technology/audio-visual-systems" },
             { title: "IT Support & Maintenance", href: "/solutions/information-technology/it-support-maintenance" },
             { title: "Asset Management", href: "/solutions/information-technology/asset-management" },
             { title: "IT Hardware Distribution", href: "/solutions/information-technology/it-hardware-distribution" },
          ]
        },
        {
          title: "Software & Programs",
          href: "/solutions/software-programs",
           items: [
             { title: "Asset Management System", href: "/solutions/software-programs/asset-management-system" },
             { title: "Booking & Resource Management System", href: "/solutions/software-programs/booking-resource-management-system" },
             { title: "Service & Feedback System", href: "/solutions/software-programs/service-feedback-system" },
             { title: "Customize Service", href: "/solutions/software-programs/customize-service" },
           ]
        },
        {
          title: "Telecom & Communication",
          href: "/solutions/telecom-communication",
           items: [
             { title: "Communication & Network Systems", href: "/solutions/telecom-communication/communication-network-systems" },
             { title: "Optical Fiber Infrastructure", href: "/solutions/telecom-communication/optical-fiber-infrastructure" },
             { title: "Engineering & Detail Design", href: "/solutions/telecom-communication/engineering-detail-design" },
           ]
        },
        {
          title: "Cyber Security",
          href: "/solutions/cyber-security",
           items: [
             { title: "Information Security Management", href: "/solutions/cyber-security/information-security-management-compliance" },
             { title: "Software Security", href: "/solutions/cyber-security/software-security" },
           ]
        },
         {
          title: "Research & Training",
          href: "/solutions/research-training",
           items: [
             { title: "Research & Academic Services", href: "/solutions/research-training/research-academic-services" },
             { title: "Training & Seminars", href: "/solutions/research-training/training-seminars" },
           ]
        },
         {
          title: "Construction & Interior",
          href: "/solutions/construction-interior-decoration",
           items: [
             { title: "Smart Building & Automation", href: "/solutions/construction-interior-decoration/smart-building-automation" },
             { title: "Building Construction & Renovation", href: "/solutions/construction-interior-decoration/building-construction-renovation" },
             { title: "MEP Systems", href: "/solutions/construction-interior-decoration/mep-systems" },
           ]
        },
      ]
    },
    {
      title: "Industries",
      href: "/industries",
      items: [
        { title: "Government & Public Sector", href: "/industries/government-public-sector" },
        { title: "Education", href: "/industries/education" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Manufacturing & Industrial", href: "/industries/manufacturing-industrial" },
        { title: "Enterprise & Corporate", href: "/industries/enterprise-corporate" },
         { title: "Smart City & Infrastructure", href: "/industries/smart-city-infrastructure" },
      ]
    },
    {
       title: "Projects",
       href: "/projects",
       items: [
          { title: "Featured Projects", href: "/projects/featured-projects" },
          { title: "IT & Digital Solutions", href: "/projects/it-digital-solutions" },
          { title: "Telecom & Infrastructure", href: "/projects/telecom-infrastructure" },
          { title: "Cyber Security", href: "/projects/cyber-security" },
          { title: "Construction & Smart Building", href: "/projects/construction-smart-building" },
       ]
    },
    {
       title: "Services",
       href: "/professional-services",
       items: [
          { title: "Consulting & Assessment", href: "/professional-services/consulting-assessment" },
          { title: "System Design & Engineering", href: "/professional-services/system-design-engineering" },
          { title: "Implementation & Integration", href: "/professional-services/implementation-integration" },
           { title: "Operations & Managed Services", href: "/professional-services/operations-managed-services" },
            { title: "Maintenance & Support", href: "/professional-services/maintenance-support" },
       ]
    },
    {
       title: "Innovation",
       href: "/innovation-rnd",
        items: [
          { title: "Research Initiatives", href: "/innovation-rnd/research-initiatives" },
          { title: "Technology Labs", href: "/innovation-rnd/technology-labs" },
          { title: "Academic Collaboration", href: "/innovation-rnd/academic-collaboration" },
           { title: "Publications & Insights", href: "/innovation-rnd/publications-insights" },
       ]
    },
     {
       title: "News",
       href: "/news-resources",
        items: [
          { title: "News & Announcements", href: "/news-resources/news-announcements" },
          { title: "Articles & Insights", href: "/news-resources/articles-insights" },
          { title: "Whitepapers & Downloads", href: "/news-resources/whitepapers-downloads" },
           { title: "Events & Seminars", href: "/news-resources/events-seminars" },
            { title: "FAQs", href: "/news-resources/faqs" },
       ]
    },
     {
       title: "Careers",
       href: "/careers",
        items: [
          { title: "Why Work With Us", href: "/careers/why-work-with-us" },
          { title: "Open Positions", href: "/careers/open-positions" },
          { title: "Internship & Training Programs", href: "/careers/internship-training-programs" },
           { title: "Life at Company", href: "/careers/life-at-company" },
       ]
    },
     {
       title: "Contact",
       href: "/contact",
        items: [
          { title: "Contact Information", href: "/contact/contact-information" },
          { title: "Request a Consultation", href: "/contact/request-a-consultation" },
          { title: "Partner with Us", href: "/contact/partner-with-us" },
           { title: "Office Locations", href: "/contact/office-locations" },
       ]
    },
  ]
}
