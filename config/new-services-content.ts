// Content for the new /services/... routes requested
export const newServicesContent = {
  "it-infrastructure": {
    title: "IT Infrastructure",
    description: "Robust, scalable, and secure foundations for your digital enterprise.",
    badge: "Infrastructure",
    overview: "We architect and deploy the physical and logical backbone of your business. From data centers to edge connectivity, our infrastructure solutions ensure high availability and future readiness.",
    features: [
      { title: "Hybrid Cloud Architecture", desc: "Seamless integration of on-premise and cloud resources." },
      { title: "Network Virtualization", desc: "SD-WAN and NFV implementation for agile connectivity." },
      { title: "Green Data Centers", desc: "Energy-efficient design and cooling capability." }
    ],
    technicalSpecs: ["Tier III Design", "100GbE Backbone", "Zero Trust Ready"],
    scene: "server"
  },
  "cyber-security": {
    title: "Cyber Security Services",
    description: "Active defense and strategic governance against modern threats.",
    badge: "Security",
    overview: "Beyond tools, we provide security assurance. Our services cover the full threat lifecycle, from proactive capability assessment to rapid incident response.",
    features: [
      { title: "Managed MDR", desc: "24/7 endpoint detection and response." },
      { title: "Penetration Testing", desc: "Red team exercises to validate defenses." },
      { title: "CISO-as-a-Service", desc: "Strategic leadership and compliance governance." }
    ],
    technicalSpecs: ["NIST Framework", "ISO 27001", "Threat Hunting"],
    scene: "shield"
  },
  "software-engineering": {
    title: "Software Engineering",
    description: "Custom digital products engineered for performance and scale.",
    badge: "Engineering",
    overview: "We build software that works. Our engineering teams specialize in high-load distributed systems, microservices architecture, and secure-by-design application development.",
    features: [
      { title: "Cloud-Native Development", desc: "Microservices on Kubernetes containers." },
      { title: "Legacy Modernization", desc: "Refactoring monoliths into scalable services." },
      { title: "DevSecOps Pipeline", desc: "Automated CI/CD with integrated security testing." }
    ],
    technicalSpecs: ["React/Node/Go", "Docker/K8s", "AWS/Azure"],
    scene: "grid"
  },
  "smart-systems": {
    title: "Smart Systems & IoT",
    description: "Connecting the physical world to digital intelligence.",
    badge: "IoT",
    overview: "Transform passive environments into active assets. We integrate IoT sensors, edge computing, and analytics platforms to create smart buildings, factories, and cities.",
    features: [
      { title: "Industrial IoT (IIoT)", desc: "Predictive maintenance and OEE monitoring." },
      { title: "Smart Building OS", desc: "Unified control of HVAC, Access, and Energy." },
      { title: "Edge Analytics", desc: "Real-time processing at the data source." }
    ],
    technicalSpecs: ["MQTT/CoAP", "LoRaWAN", "Digital Twin"],
    scene: "orb"
  },
  "managed-services": {
    title: "Managed Services",
    description: "Operational excellence delivered as a predictable service.",
    badge: "Operations",
    overview: "Focus on your business, not your IT. Our managed services provide end-to-end operational support, from user helpdesk to complex infrastructure management.",
    features: [
      { title: "Proactive Monitoring", desc: "Identifying issues before they impact business." },
      { title: "Patch Management", desc: "Fleet-wide security updates and compliance." },
      { title: "Cloud Management", desc: "Cost and performance optimization for cloud resources." }
    ],
    technicalSpecs: ["SLA 99.99%", "24/7/365", "ITIL v4"],
    scene: "city"
  }
}

// Content for the main Section Landing Pages (Projects, Innovation, etc.)
export const sectionLandingContent = {
  projects: {
    title: "Our Projects",
    description: "A portfolio of complex engineering challenges solved with precision.",
    badge: "Portfolio",
    overview: "From government infrastructure to private enterprise systems, our work speaks for itself. Explore our featured case studies below.",
    scene: "city",
    links: [
      { title: "Featured Projects", href: "/projects/featured-projects", desc: "Highlighting our most impactful work." },
      { title: "Government", href: "/projects/construction-smart-building", desc: "Public sector infrastructure." },
      { title: "Enterprise", href: "/projects/it-digital-solutions", desc: "Corporate digital transformation." }
    ]
  },
  "professional-services": {
    title: "Professional Services",
    description: "Expertise dispatched where you need it most.",
    badge: "Expertise",
    overview: "We don't just sell products; we solve problems. Our professional services team delivers consulting, implementation, and operational support.",
    scene: "grid",
    links: [
       { title: "Consulting", href: "/professional-services/consulting-assessment", desc: "Strategic technology planning." },
       { title: "Implementation", href: "/professional-services/implementation-integration", desc: "Deployment and systems integration." },
       { title: "Operations", href: "/professional-services/operations-managed-services", desc: "Ongoing management and support." }
    ]
  },
  "innovation-rnd": {
    title: "Innovation & R&D",
    description: "Pioneering the future of resilient technology.",
    badge: "Future",
    overview: "Our labs are where theory meets application. We invest heavily in research to stay ahead of the curve in quantum security, AI, and smart infrastructure.",
    scene: "orb",
    links: [
       { title: "Research Initiatives", href: "/innovation-rnd/research-initiatives", desc: "Active research programs." },
       { title: "Technology Labs", href: "/innovation-rnd/technology-labs", desc: "Our experimental facilities." },
       { title: "Publications", href: "/innovation-rnd/publications-insights", desc: "Whitepapers and technical reports." }
    ]
  },
  "news-resources": {
    title: "News & Resources",
    description: "Insights, updates, and knowledge sharing.",
    badge: "Knowledge",
    overview: "Stay informed with the latest updates from Sunpeak Tech and deep dives into industry trends.",
    scene: "city",
    links: [
       { title: "Latest News", href: "/news-resources/news-announcements", desc: "Company announcements." },
       { title: "Articles", href: "/news-resources/articles-insights", desc: "Technical articles and thought leadership." },
       { title: "Events", href: "/news-resources/events-seminars", desc: "Upcoming webinars and workshops." }
    ]
  }
}
