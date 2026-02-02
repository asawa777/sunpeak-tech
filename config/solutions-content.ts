export const solutionsContent = {
  // Information Technology
  "application-database-systems": {
    title: "Application & Database Systems",
    description: "Enterprise-grade architecture for data integrity and high-performance applications.",
    badge: "Information Technology",
    overview: "We design and deploy integrated application ecosystems. From frontend interfaces to complex backend logic and distributed databases, our systems are built for scalability and data consistency.",
    features: [
      { title: "Multi-Layer Architecture", desc: "Decoupled frontend, API, and database layers for independent scaling." },
      { title: "Data Integrity", desc: "ACID-compliant transactions and robust consistency models." },
      { title: "Legacy Integration", desc: "Seamless middleware connectors for existing enterprise systems." }
    ],
    technicalSpecs: ["Microservices", "SQL/NoSQL Clusters", "API Gateway Patterns"],
    scene: "server"
  },
  "data-center-disaster-recovery": {
    title: "Data Center & Disaster Recovery",
    description: "Resilient infrastructure with guaranteed business continuity.",
    badge: "Information Technology",
    overview: "Our data center solutions prioritize uptime and redundancy. We architect primary and secondary sites with automated failover to ensure your critical operations never stop.",
    features: [
      { title: "Active-Active Redundancy", desc: "Live replication across geographically distributed sites." },
      { title: "Automated Failover", desc: "Zero-touch switching during site outages." },
      { title: "Power & Cooling", desc: "N+1 redundancy on all physical infrastructure layers." }
    ],
    technicalSpecs: ["RTO/RPO < 5min", "Tier III Standards", "Geo-Replication"],
    scene: "server"
  },
  "noc-soc-operations": {
    title: "NOC & SOC Operations",
    description: "24/7 monitoring and incident response command centers.",
    badge: "Information Technology",
    overview: "Gain complete visibility into your network and security posture. Our NOC/SOC solutions integrate real-time alerting, automated triage, and rapid incident response.",
    features: [
      { title: "Unified Dashboards", desc: "Single-pane-of-glass view for network performance and security threats." },
      { title: "Automated Triage", desc: "AI-driven alert correlation to reduce noise." },
      { title: "24/7 Readiness", desc: "Shift-based workflows ensuring continuous eyes-on-screen." }
    ],
    technicalSpecs: ["SIEM Integration", "Network Telemetry", "Incident Playbooks"],
    scene: "grid"
  },
  "audio-visual-systems": {
    title: "Audio-Visual Systems",
    description: "Integrated AV solutions for command centers and corporate spaces.",
    badge: "Information Technology",
    overview: "We engineer audiovisual environments that facilitate communication. From boardroom automation to large-scale video walls in command centers, our systems are reliable and intuitive.",
    features: [
      { title: "Signal Routing", desc: "Low-latency distribution of high-resolution video streams." },
      { title: "Room Automation", desc: "One-touch control for lighting, audio, and display." },
      { title: "Digital Signage", desc: "Centralized content management for distributed displays." }
    ],
    technicalSpecs: ["Video Wall Processors", "Dante Audio", "Control Systems"],
    scene: "orb"
  },
  "it-support-maintenance": {
    title: "IT Support & Maintenance",
    description: "SLA-driven lifecycle strategies for enterprise continuity.",
    badge: "Information Technology",
    overview: "Technology requires care. Our support services move from reactive fixing to proactive prevention, ensuring your infrastructure operates at peak efficiency.",
    features: [
      { title: "Preventive Maintenance", desc: "Scheduled health checks to identify issues before failure." },
      { title: "SLA Guarantees", desc: "Contractually defined response and resolution times." },
      { title: "Multi-Channel Support", desc: "On-site engineers backed by remote specialist teams." }
    ],
    technicalSpecs: ["24/7 Service Desk", "ITIL Framework", "Asset Lifecycles"],
    scene: "shield"
  },
  "asset-management": {
    title: "Asset Management",
    description: "End-to-end tracking and lifecycle optimization for IT hardware.",
    badge: "Information Technology",
    overview: "Control your inventory. Our asset management systems track every device from procurement to disposal, ensuring compliance and cost optimization.",
    features: [
      { title: "Lifecycle Tracking", desc: "Monitor procurement, deployment, maintenance, and retirement." },
      { title: "Audit Readiness", desc: "Automated reporting for financial and security compliance." },
      { title: "Usage Analytics", desc: "Identify underutilized resources to optimize spend." }
    ],
    technicalSpecs: ["RFID/Barcode Tagging", "Depreciation logic", "API Integrations"],
    scene: "server"
  },
  "it-hardware-distribution": {
    title: "IT Hardware Distribution",
    description: "Strategic sourcing and logistics for enterprise deployment.",
    badge: "Information Technology",
    overview: "We simplify the supply chain. Our distribution network ensures you get the right enterprise-grade hardware, configured and delivered on schedule.",
    features: [
      { title: "Global Sourcing", desc: "Direct relationships with Tier-1 manufacturers." },
      { title: "Staging & Configuration", desc: "Pre-deployment setup to minimize on-site installation time." },
      { title: "Warranty Management", desc: "Centralized handling of RMAs and support contracts." }
    ],
    technicalSpecs: ["Just-in-Time Delivery", "Bulk Licensing", "Global Logistics"],
    scene: "city"
  },

  // Software & Programs
  "asset-management-system": {
    title: "Asset Management System",
    description: "Purpose-built software for tracking physical and digital assets.",
    badge: "Software & Programs",
    overview: "A digital command center for your physical inventory. Our software provides real-time visibility into asset location, status, and ownership.",
    features: [
      { title: "Real-Time Registry", desc: "Live database of all registered assets and their states." },
      { title: "Maintenance Schedules", desc: "Automated alerts for upcoming service requirements." },
      { title: "Audit Workflows", desc: "Streamlined tools for physical verification cycles." }
    ],
    technicalSpecs: ["Cloud/On-Prem", "Mobile App Support", "Barcode Scanning"],
    scene: "grid"
  },
  "booking-resource-management-system": {
    title: "Booking & Resource Management",
    description: "Optimizing space and resource utilization across the enterprise.",
    badge: "Software & Programs",
    overview: "Eliminate scheduling conflicts. Our booking system manages meeting rooms, shared desks, and equipment with collision detection and utilization analytics.",
    features: [
      { title: "Conflict Resolution", desc: "Smart logic to prevent double-booking." },
      { title: "Visual Allocation", desc: "Interactive floor maps and calendars." },
      { title: "Utilization Analytics", desc: "Heatmaps of most-used spaces and times." }
    ],
    technicalSpecs: ["Outlook/G-Suite Sync", "Kiosk Mode", "Occupancy Sensors"],
    scene: "orb"
  },
  "service-feedback-system": {
    title: "Service & Feedback System",
    description: "Closing the loop on service quality and internal satisfaction.",
    badge: "Software & Programs",
    overview: "Measure what matters. This system digitizes the feedback loop, allowing stakeholders to report issues and rate service delivery in real-time.",
    features: [
      { title: "Ticket Lifecycle", desc: "Track issues from reporting to resolution." },
      { title: "SLA Tracking", desc: "Automated timers for response and resolution benchmarks." },
      { title: "Satisfaction Metrics", desc: "CSAT and NPS scoring for internal services." }
    ],
    technicalSpecs: ["Workflow Engine", "Email Notifications", "Reporting Dashboards"],
    scene: "shield"
  },
  "customize-service": {
      title: "Customize Service",
      description: "Tailored software solutions for unique operational needs.",
      badge: "Software & Programs",
      overview: "When off-the-shelf doesn't fit. We engineer custom software components to bridge gaps in your workflow or extend existing platform capabilities.",
      features: [
          { title: "Requirement Analysis", desc: "Deep dive workshops to map unique business logic." },
          { title: "Agile Development", desc: "Iterative delivery with frequent stakeholder checkpoints." },
          { title: "Integration Adapters", desc: "Custom connectors for proprietary legacy systems." }
      ],
      technicalSpecs: ["Custom APIs", "Modular Architecture", "Secure Coding"],
      scene: "grid"
  },

  // Telecom & Communication
  "communication-network-systems": {
    title: "Communication & Network Systems",
    description: "Foundational connectivity for the connected enterprise.",
    badge: "Telecom & Communication",
    overview: "We build the invisible backbone of your business. From high-density Wi-Fi to redundant WAN links, our networks are designed for density, speed, and reliability.",
    features: [
      { title: "Enterprise LAN/WAN", desc: "Scalable switching and routing architectures." },
      { title: "High-Density Wi-Fi", desc: "Wireless planning for stadiums, campuses, and offices." },
      { title: "Unified Communications", desc: "Integration of voice, video, and data traffic." }
    ],
    technicalSpecs: ["SD-WAN", "Wi-Fi 6/6E", "QoS Optimization"],
    scene: "orb"
  },
  "optical-fiber-infrastructure": {
    title: "Optical Fiber Infrastructure",
    description: "High-capacity backbone transmission for city-scale networks.",
    badge: "Telecom & Communication",
    overview: "Speed at light capability. We plan and deploy optical fiber networks, handling everything from underground trenching to ODF termination.",
    features: [
      { title: "Backbone Design", desc: "Ring architectures for redundant city-wide connectivity." },
      { title: "Physical Deployment", desc: "Aerial and underground cabling installation." },
      { title: "OTDR Testing", desc: "Precision certification of all fiber links." }
    ],
    technicalSpecs: ["Single/Multi-Mode", "DWDM", "OSP Engineering"],
    scene: "server"
  },
  "engineering-detail-design": {
    title: "Engineering & Detail Design",
    description: "Precision planning before the first cable is laid.",
    badge: "Telecom & Communication",
    overview: "Success is in the details. Our engineering team produces comprehensive site surveys, technical drawings, and link budget calculations to guarantee performance.",
    features: [
      { title: "Site Surveys", desc: "Physical assessment of towers, rooftops, and duct paths." },
      { title: "Technical Drawing", desc: "CAD/BIM models of proposed infrastructure." },
      { title: "Compliance Review", desc: "Ensuring designs meet local regulatory and safety standards." }
    ],
    technicalSpecs: ["AutoCAD/Revit", "Link Budgeting", "Structural Analysis"],
    scene: "grid"
  },

  // Cyber Security
  "information-security-management-compliance": {
    title: "InfoSec Management & Compliance",
    description: "Governance structures to manage risk and demonstrate resilience.",
    badge: "Cyber Security",
    overview: "Security is a process, not a product. We help organizations build ISMS frameworks, assess risk, and achieve compliance with international standards.",
    features: [
      { title: "Governance Frameworks", desc: "Building policies aligned with ISO 27001 and NIST." },
      { title: "Risk Assessment", desc: "Systematic identification and evaluation of threat vectors." },
      { title: "Compliance Audits", desc: "Preparation and gap analysis for regulatory reviews." }
    ],
    technicalSpecs: ["ISO 27001", "PDPA/GDPR", "Risk Matrices"],
    scene: "shield"
  },
  "software-security": {
    title: "Software Security",
    description: "Building security into the development lifecycle.",
    badge: "Cyber Security",
    overview: "Secure by design. We integrate security testing into the SDLC, ensuring applications are hardened against vulnerabilities before deployment.",
    features: [
      { title: "Vulnerability Scanning", desc: "Automated analysis of code and dependencies." },
      { title: "Secure Coding", desc: "Development practices that prevent common exploit vectors." },
      { title: "Penetration Testing", desc: "Ethical hacking to validate defense mechanisms." }
    ],
    technicalSpecs: ["OWASP Top 10", "SAST/DAST", "DevSecOps"],
    scene: "shield"
  },

  // Research & Training
  "research-academic-services": {
    title: "Research & Academic Services",
    description: "Bridging the gap between theory and industrial application.",
    badge: "Research",
    overview: "We partner with academic institutions to apply rigorous research methodologies to real-world industrial problems.",
    features: [
      { title: "Applied Research", desc: "Translating theoretical findings into working prototypes." },
      { title: "Joint Laboratories", desc: "Co-creation spaces for students and industry experts." },
      { title: "Technical Studies", desc: "Feasibility and impact analysis for emerging tech." }
    ],
    technicalSpecs: ["R&D Grants", "Prototype Labs", "Knowledge Transfer"],
    scene: "orb"
  },
  "training-seminars": {
    title: "Training & Seminars",
    description: "Upskilling the workforce for the digital future.",
    badge: "Training",
    overview: "Knowledge transfer is key to sustainability. Our training programs are designed to equip your team with the skills to manage modern systems.",
    features: [
      { title: "Technical Workshops", desc: "Hands-on usage training for specific platforms." },
      { title: "Certification Prep", desc: "Guidance for industry-standard professional exams." },
      { title: "Executive Briefings", desc: "High-level technology strategy sessions for leadership." }
    ],
    technicalSpecs: ["Instructor-Led", "LMS Integration", "Custom Curriculum"],
    scene: "city"
  },

  // Construction & Interior
  "smart-building-automation": {
    title: "Smart Building & Automation",
    description: "Intelligence integrated into the physical structure.",
    badge: "Construction",
    overview: "A building that thinks. We integrate sensors, controls, and analytics to optimize energy, comfort, and security within the built environment.",
    features: [
      { title: "BMS Integration", desc: "Centralized control of HVAC, lighting, and access." },
      { title: "Energy Optimization", desc: "Automated adjustments based on occupancy and weather." },
      { title: "IoT Sensor Grids", desc: "Granular data collection for persistent monitoring." }
    ],
    technicalSpecs: ["BACnet/Modbus", "Digital Twins", "Sustainability Goals"],
    scene: "city"
  },
  "building-construction-renovation": {
    title: "Construction & Renovation",
    description: "Tech-ready physical spaces for modern operations.",
    badge: "Construction",
    overview: "We build spaces designed for technology. From raised floors in data centers to shielded rooms for sensitive ops, our construction considers the tech layer first.",
    features: [
      { title: "Tech-Ready Spaces", desc: "Architecture optimized for cabling, airflow, and power." },
      { title: "Industrial Renovation", desc: "Upgrading legacy facilities for modern standards." },
      { title: "Specialized Zones", desc: "Construction of server rooms, labs, and command centers." }
    ],
    technicalSpecs: ["Structural Engineering", "Acoustic Treatment", "Fire Suppression"],
    scene: "server"
  },
  "mep-systems": {
    title: "MEP Systems",
    description: "The mechanical, electrical, and plumbing lifelines of your facility.",
    badge: "Construction",
    overview: "Reliable utilities are non-negotiable. Our MEP engineering ensures that power, cooling, and water systems are robust enough to support critical workloads.",
    features: [
      { title: "Electrical Engineering", desc: "High-availability power distribution and backup." },
      { title: "Precision Cooling", desc: "HVAC systems designed for high-density heat loads." },
      { title: "Utility Coordination", desc: "Seamless integration of water and drainage systems." }
    ],
    technicalSpecs: ["Load Balancing", "UPS/Generators", "Fluid Dynamics"],
    scene: "grid"
  }
}
