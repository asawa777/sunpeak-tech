import { PageTemplate } from "@/components/templates/page-template"

export default function PrivacyPolicyPage() {
  return (
    <PageTemplate 
      title="Privacy Policy" 
      description="How we collect, use, and protect your data."
      badge="Legal"
      type="general"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Last updated: february 3, 2026</p>

        <h3>1. Introduction</h3>
        <p>
          Sunpeak Tech ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website 
          (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
        </p>

        <h3>2. Data We Collect</h3>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
        </p>
        <ul>
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        </ul>

        <h3>3. How We Use Your Data</h3>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>To respond to your inquiries regarding our services.</li>
          <li>To improve our website, products/services, marketing, and customer relationships.</li>
          <li>To comply with a legal obligation.</li>
        </ul>

        <h3>4. Data Security</h3>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
        </p>

        <h3>5. Contact Us</h3>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at: 
          <a href="mailto:sunpeaktech.th@gmail.com">sunpeaktech.th@gmail.com</a>.
        </p>
      </div>
    </PageTemplate>
  )
}
