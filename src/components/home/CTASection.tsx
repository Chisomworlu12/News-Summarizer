import { useNavigate } from "react-router-dom"
import { ArrowRight, Users } from "lucide-react"

const CTASection = () => {
  const navigate = useNavigate()

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-purple via-brand-indigo to-brand-blue p-12 text-center shadow-2xl shadow-brand-purple/30">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-semibold mb-6">
              <Users size={14} />
              Join thousands of readers
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/75 mb-10 max-w-lg mx-auto leading-relaxed">
              Save 5+ hours every week by getting instant AI summaries of your news feed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/newsfeed")}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-brand-purple bg-white hover:bg-white/90 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                Get Started Free <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-white/75 hover:text-white font-semibold text-sm transition-colors"
              >
                Create account →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection
