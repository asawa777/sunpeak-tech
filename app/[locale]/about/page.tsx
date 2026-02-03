import { PageTemplate } from "@/components/templates/page-template"

export default function AboutPage() {
  return (
    <PageTemplate 
      title="About Sunpeak Tech" 
      description="A leading provider of IT infrastructure, security, and smart systems."
      badge="Our Story"
      type="general"
    >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">
              Sunpeak Tech was founded with a mission to bridge the gap between complex technology and business efficiency. We believe that technology should be an enabler, not a bottleneck.
          </p>
          <p>
              Our team of certified experts brings decades of experience in Network Systems, Cyber Security, and Software Engineering. We partner with industry leaders to deliver enterprise-grade solutions to businesses of all sizes.
          </p>
          <p>
              From modernizing data centers to securing critical assets and enabling smart building automation, our comprehensive portfolio ensures that we are the only technology partner you will ever need.
          </p>
        </div>
    </PageTemplate>
  )
}
