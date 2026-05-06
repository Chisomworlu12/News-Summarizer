import { Zap } from "lucide-react"

interface SummaryCountProps {
  summaryCount: number
}

const SummaryCount: React.FC<SummaryCountProps> = ({ summaryCount }) => {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-sm">
        <Zap size={15} className="text-amber-500 shrink-0" />
        <p className="text-amber-700 dark:text-amber-400 font-medium">
          <span className="font-black">{summaryCount}/2</span> free summaries used —{' '}
          <span className="underline cursor-pointer hover:text-amber-600">Sign up for unlimited</span>
        </p>
      </div>
    </div>
  )
}

export default SummaryCount
