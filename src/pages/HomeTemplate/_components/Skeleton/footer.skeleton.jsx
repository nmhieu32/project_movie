export default function FooterSkeleton() {
  return (
    <footer className="bg-[#15222B] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="size-20 bg-gray-700 rounded-full mb-2"></div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 bg-gray-700 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
            <div className="flex flex-col gap-4">
              <div className="h-3 w-20 bg-gray-700 rounded"></div>
              <div className="h-3 w-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-6 pt-4 text-xs text-center md:text-left">
          <div className="h-3 w-40 bg-gray-700 rounded mx-auto md:mx-0"></div>
        </div>
      </div>
    </footer>
  );
}
