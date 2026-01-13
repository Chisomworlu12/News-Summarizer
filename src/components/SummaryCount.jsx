function SummaryCount({ summaryCount }) {
    return (
         <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 max-w-6xl mx-auto mt-4">
          <p className="text-yellow-700 dark:text-yellow-200 font-medium">
            {summaryCount}/2 free summaries used
          </p>
        </div>
    )
}

export default SummaryCount
