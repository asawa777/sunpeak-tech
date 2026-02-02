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
      title: "Services",
      href: "/services",
      items: [
        {
          title: "IT Infrastructure",
          href: "/services/it-infrastructure",
          items: [
            { title: "Network Systems", href: "/services/it-infrastructure/network-systems" },
            { title: "Data Center", href: "/services/it-infrastructure/data-center" },
            { title: "Disaster Recovery", href: "/services/it-infrastructure/disaster-recovery" },
            { title: "Optical Fiber", href: "/services/it-infrastructure/optical-fiber" },
            { title: "NOC & SOC", href: "/services/it-infrastructure/noc-soc" },
          ]
        },
        {
          title: "Cyber Security",
          href: "/services/cyber-security",
          items: [
            { title: "Security Assessment", href: "/services/cyber-security/security-assessment" },
            { title: "SOC Monitoring", href: "/services/cyber-security/soc-monitoring" },
            { title: "Software Security", href: "/services/cyber-security/software-security" },
            { title: "ISO 27001 Compliance", href: "/services/cyber-security/iso-27001-compliance" },
          ]
        },
        {
          title: "Software Engineering",
          href: "/services/software-engineering",
          items: [
            { title: "Custom Software", href: "/services/software-engineering/custom-software" },
            { title: "Web Applications", href: "/services/software-engineering/web-applications" },
            { title: "System Design", href: "/services/software-engineering/system-design" },
            { title: "Database Systems", href: "/services/software-engineering/database-systems" },
             { title: "Asset Management", href: "/services/software-engineering/asset-management" },
          ]
        },
        {
          title: "Smart Systems",
          href: "/services/smart-systems",
          items: [
             { title: "Smart Building", href: "/services/smart-systems/smart-building" },
             { title: "Automation", href: "/services/smart-systems/automation" },
             { title: "Audio Visual", href: "/services/smart-systems/audio-visual" },
             { title: "Telecom", href: "/services/smart-systems/telecom" },
          ]
        },
        {
          title: "Managed Services",
          href: "/services/managed-services",
          items: [
             { title: "IT Support", href: "/services/managed-services/it-support" },
             { title: "System Maintenance", href: "/services/managed-services/system-maintenance" },
             { title: "Monitoring", href: "/services/managed-services/monitoring" },
             { title: "On-site Support", href: "/services/managed-services/on-site-support" },
          ]
        },
      ]
    },
    {
      title: "Solutions",
      href: "/solutions",
      items: [
        { title: "Enterprise IT", href: "/solutions/enterprise-it" },
        { title: "SMB IT", href: "/solutions/smb-it" },
        { title: "Government", href: "/solutions/government" },
        { title: "Education", href: "/solutions/education" },
        { title: "Healthcare", href: "/solutions/healthcare" },
        { title: "Industrial", href: "/solutions/industrial" },
      ]
    },
    {
      title: "Industries",
      href: "/industries",
      items: [
        { title: "Finance", href: "/industries/finance" },
        { title: "Manufacturing", href: "/industries/manufacturing" },
        { title: "Telecom", href: "/industries/telecom" },
        { title: "Real Estate", href: "/industries/real-estate" },
         { title: "Retail", href: "/industries/retail" },
          { title: "Logistics", href: "/industries/logistics" },
      ]
    },
    {
      title: "Case Studies",
      href: "/case-studies",
    },
    {
      title: "Insights",
      href: "/insights",
    },
    {
      title: "About",
      href: "/about",
      items: [
        { title: "Company", href: "/about/company" },
        { title: "Our Team", href: "/about/our-team" },
        { title: "Partners", href: "/about/partners" },
         { title: "Careers", href: "/about/careers" },
      ]
    },
  ]
}
