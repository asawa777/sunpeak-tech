import { PageTemplate } from "@/components/templates/page-template"

export default function TermsOfServicePage() {
  return (
    <PageTemplate 
      title="Terms of Service" 
      description="Rules and regulations for the use of Sunpeak Tech's Website."
      badge="Legal"
      type="general"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Last updated: february 3, 2026</p>

        <h3>1. Agreement to Terms</h3>
        <p>
          By accessing this website, you agree to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
        </p>

        <h3>2. Intellectual Property Rights</h3>
        <p>
          Other than the content you own, under these Terms, Sunpeak Tech and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
        </p>

        <h3>3. Restrictions</h3>
        <p>
          You are specifically restricted from all of the following:
        </p>
        <ul>
          <li>Publishing any Website material in any other media;</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>Publicly performing and/or showing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website;</li>
          <li>Using this Website in any way that impacts user access to this Website;</li>
        </ul>

        <h3>4. Limitation of Liability</h3>
        <p>
          In no event shall Sunpeak Tech, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
        </p>

        <h3>5. Governing Law & Jurisdiction</h3>
        <p>
          These Terms will be governed by and interpreted in accordance with the laws of the Kingdom of Thailand, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Thailand for the resolution of any disputes.
        </p>
      </div>
    </PageTemplate>
  )
}
