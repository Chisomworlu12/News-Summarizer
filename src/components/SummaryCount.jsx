function SummaryCount({ summaryCount }) {
    return (
         <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 max-w-6xl mx-auto mt-4">
          <p className="text-yellow-700">
            {summaryCount}/3 free summaries used
          </p>
        </div>
    )
}

export default SummaryCount
