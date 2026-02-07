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
      title: "nav.about",
      href: "/about",
      items: [
        { title: "nav.company_overview", href: "/about/company-overview" },
        { title: "nav.vision_mission", href: "/about/vision-mission" },
        { title: "nav.certifications_standards", href: "/about/certifications-standards" },
        { title: "nav.management_team", href: "/about/management-team" },
        { title: "nav.partners", href: "/about/partners-alliances" },
      ]
    },
    {
      title: "nav.solutions",
      href: "/solutions",
      items: [
        {
          title: "nav.information_technology",
          href: "/solutions/information-technology",
          items: [
             { title: "nav.app_database", href: "/solutions/information-technology/application-database-systems" },
             { title: "nav.data_center", href: "/solutions/information-technology/data-center-disaster-recovery" },
             { title: "nav.noc_soc", href: "/solutions/information-technology/noc-soc-operations" },
             { title: "nav.av_systems", href: "/solutions/information-technology/audio-visual-systems" },
             { title: "nav.it_support", href: "/solutions/information-technology/it-support-maintenance" },
             { title: "nav.asset_mgmt", href: "/solutions/information-technology/asset-management" },
             { title: "nav.hardware_dist", href: "/solutions/information-technology/it-hardware-distribution" },
          ]
        },
        {
          title: "nav.software_programs",
          href: "/solutions/software-programs",
          items: [
             { title: "nav.asset_sys", href: "/solutions/software-programs/asset-management-system" },
             { title: "nav.booking_sys", href: "/solutions/software-programs/booking-resource-management" },
             { title: "nav.feedback_sys", href: "/solutions/software-programs/service-feedback-system" },
             { title: "nav.customize_sys", href: "/solutions/software-programs/customize-system" },
          ]
        },
        {
          title: "nav.telecom_comm",
          href: "/solutions/telecom-communication",
          items: [
             { title: "nav.comm_network", href: "/solutions/telecom-communication/communication-network-systems" },
             { title: "nav.optical_fiber", href: "/solutions/telecom-communication/optical-fiber-infrastructure" },
             { title: "nav.eng_design", href: "/solutions/telecom-communication/engineering-detail-design" },
          ]
        },
        {
          title: "nav.cyber_security",
          href: "/solutions/cyber-security",
          items: [
             { title: "nav.ism_compliance", href: "/solutions/cyber-security/information-security-management-compliance" },
             { title: "nav.software_sec", href: "/solutions/cyber-security/software-security" },
          ]
        },
        {
           title: "nav.research_training",
           href: "/solutions/research-training",
           items: [
              { title: "nav.research_academic", href: "/solutions/research-training/research-academic-services" },
              { title: "nav.training_seminars", href: "/solutions/research-training/training-seminars" },
           ]
        },
        {
          title: "nav.construction_interior",
          href: "/solutions/construction-interior-decoration",
          items: [
             { title: "nav.smart_building", href: "/solutions/construction-interior-decoration/smart-building-automation" },
             { title: "nav.building_renovation", href: "/solutions/construction-interior-decoration/building-construction-renovation" },
             { title: "nav.mep_systems", href: "/solutions/construction-interior-decoration/mep-systems" },
          ]
        },
      ]
    },
    {
      title: "nav.industries",
      href: "/industries",
      items: [
        { title: "nav.govt_public", href: "/industries/government-public-sector" },
        { title: "nav.education", href: "/industries/education" },
        { title: "nav.healthcare", href: "/industries/healthcare" },
        { title: "nav.manufacturing", href: "/industries/manufacturing-industrial" },
        { title: "nav.enterprise", href: "/industries/enterprise-corporate" },
        { title: "nav.smart_city_infra", href: "/industries/smart-city-infrastructure" },
      ]
    },
    {
       title: "nav.projects", // Featured Projects
       href: "/projects",
       items: [
          { title: "nav.featured_projects", href: "/projects/featured" },
          { title: "nav.it_digital_projects", href: "/projects/it-digital-solutions" },
          { title: "nav.telecom_projects", href: "/projects/telecom-infrastructure" },
          { title: "nav.cyber_projects", href: "/projects/cyber-security" },
          { title: "nav.construction_projects", href: "/projects/construction-smart-building" },
       ]
    },
    {
       title: "nav.services", // Consulting & Assessment, etc. (Professional Services)
       href: "/professional-services",
       items: [
          { title: "nav.consulting", href: "/professional-services/consulting-assessment" },
          { title: "nav.system_design_eng", href: "/professional-services/system-design-engineering" },
          { title: "nav.implementation", href: "/professional-services/implementation-integration" },
          { title: "nav.managed_services", href: "/professional-services/operations-managed-services" },
          { title: "nav.maintenance", href: "/professional-services/maintenance-support" },
       ]
    },
    {
       title: "nav.careers", // Why Work With Us
       href: "/careers",
       items: [
          { title: "nav.why_work_with_us", href: "/careers/why-work-with-us" },
       ]
    },
    {
       title: "nav.contact",
       href: "/contact",
       items: [
          { title: "nav.request_consultation", href: "/contact/request-a-consultation" },

          { title: "nav.partner_with_us", href: "/contact/partner-with-us" },
       ]
    },
  ],
  footerNav: {
     legal: [
        { title: "nav.privacy_policy", href: "/legal/privacy-policy" },
        { title: "nav.terms_conditions", href: "/legal/terms-conditions" },
        { title: "nav.cookie_policy", href: "/legal/cookie-policy" },
        { title: "nav.compliance_cert", href: "/legal/compliance-certifications" },
     ]
  }
}
