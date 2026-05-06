import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import Navbar from '../components/layout/Navbar/Navbar.js'
import Footer from '../components/layout/Footer.js'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
    <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2">
      {children}
    </div>
  </div>
)

function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-purple dark:hover:text-brand-purple-light transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-brand-purple to-brand-indigo flex items-center justify-center shadow-lg shadow-brand-purple/30 shrink-0">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-0.5">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-white/5 p-8">

          <Section title="1. Overview">
            <p>NewsSummarizer ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information when you use our Service.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-slate-700 dark:text-slate-300">Account data:</strong> Email address and encrypted password when you register. If you sign in with Google, we receive your name and email from Google OAuth.</li>
              <li><strong className="text-slate-700 dark:text-slate-300">Usage data:</strong> Summary request counts (stored in our database to enforce rate limits) and the last time RSS feeds were refreshed (stored in <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code>).</li>
              <li><strong className="text-slate-700 dark:text-slate-300">Saved summaries:</strong> AI-generated summaries you choose to save are stored in our Supabase database, linked to your user account.</li>
              <li><strong className="text-slate-700 dark:text-slate-300">Guest data:</strong> Summary count for unauthenticated users is stored only in your browser's <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> — we do not store any data server-side for guests.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect solely to operate and improve the Service:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Authenticating your account and maintaining your session</li>
              <li>Enforcing per-user AI summary rate limits</li>
              <li>Storing and retrieving your saved summaries</li>
              <li>Sending account confirmation and password reset emails (via Supabase Auth)</li>
            </ul>
            <p className="mt-2">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </Section>

          <Section title="4. Data Storage & Security">
            <p>Your data is stored in <strong className="text-slate-700 dark:text-slate-300">Supabase</strong> (PostgreSQL), hosted on AWS infrastructure. Supabase enforces Row Level Security (RLS) policies — your saved summaries are only accessible to your own account.</p>
            <p className="mt-2">Authentication uses the PKCE flow with short-lived JWTs. Sessions are automatically invalidated after 2 hours of inactivity. We never store plain-text passwords.</p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>The Service integrates with the following third parties, each with their own privacy policies:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-slate-700 dark:text-slate-300">Supabase:</strong> Authentication, database, and Edge Functions hosting.</li>
              <li><strong className="text-slate-700 dark:text-slate-300">OpenAI:</strong> Article content is sent to OpenAI's API server-side to generate summaries. OpenAI's data usage policy applies. Article content is not linked to your identity when sent.</li>
              <li><strong className="text-slate-700 dark:text-slate-300">Google OAuth:</strong> Used as an optional sign-in method. We only receive your email and display name.</li>
              <li><strong className="text-slate-700 dark:text-slate-300">RSS News Sources:</strong> Articles are fetched from public RSS feeds (e.g. BBC, Reuters, The Guardian). We do not share any user data with these sources.</li>
            </ul>
          </Section>

          <Section title="6. Cookies & Local Storage">
            <p>We do not use advertising or tracking cookies. The Service uses browser <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Theme preference (dark/light mode)</li>
              <li>Last RSS feed refresh timestamp</li>
              <li>Guest summary count (unauthenticated users only)</li>
            </ul>
            <p className="mt-2">This data never leaves your device and can be cleared at any time by clearing your browser's site data.</p>
          </Section>

          <Section title="7. Data Retention">
            <p>Account data and saved summaries are retained for as long as your account is active. You may delete your saved summaries at any time from the Saved Summaries page. To request full account deletion, please contact us via the GitHub profile linked below.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>The Service is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can delete it.</p>
          </Section>

          <Section title="9. Your Rights">
            <p>Depending on your location, you may have rights to access, correct, or delete the personal data we hold about you. To exercise any of these rights, please reach out via the contact method below.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will indicate the last updated date at the top of this page. Continued use of the Service after changes are posted constitutes acceptance of the revised policy.</p>
          </Section>

          <Section title="11. Contact">
            <p>For any privacy-related questions or data requests, please reach out via the <a href="https://github.com/Chisomworlu12" target="_blank" rel="noopener noreferrer" className="text-brand-indigo dark:text-brand-purple-light hover:underline font-medium">GitHub profile</a>.</p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
