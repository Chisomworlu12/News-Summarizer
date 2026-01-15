export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        
        
        <div className="mb-4 md:mb-0">
          <p className="text-gray-900 dark:text-white font-bold text-lg">
            NewsSummarizer<span className="text-blue-500">.</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

   
        <div className="text-center text-gray-500 dark:text-gray-400 max-w-xs mb-4 md:mb-0">
          Fetching live updates from various RSS sources to keep you informed.
        </div>

        <div className="flex space-x-6 text-gray-600 dark:text-gray-400">
          <span className="hover:text-blue-500 cursor-pointer transition-colors"><a href="https://github.com/Chisomworlu12" target="_blank" rel="noopener noreferrer">Github</a></span>
          <span className="hover:text-blue-500 cursor-pointer transition-colors"><a href="https://chisom-portfoilio.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a></span>
        </div>
      </div>
    </footer>
  );
}