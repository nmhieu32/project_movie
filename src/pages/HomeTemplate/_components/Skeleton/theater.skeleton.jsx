export default function SkeletonTheater() {
  return (
    <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden h-full m-4 animate-pulse">
      <div className="flex md:flex-col items-center md:items-start justify-center md:justify-start bg-white border-b md:border-b-0 md:border-r border-gray-300 p-0 gap-0 md:w-1/6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 p-4 w-full border-l-4 border-transparent"
          >
            <div className="w-16 h-16 bg-gray-300 rounded mx-auto" />
          </div>
        ))}
      </div>

      <div className="md:w-1/3 bg-white border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border-l-4 border-transparent">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white p-4 overflow-y-auto">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row mb-4 pb-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="w-28 h-40 bg-gray-300 rounded mb-2 sm:mb-0 sm:mr-4" />
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="px-4 py-2 bg-gray-200 rounded w-16 h-6"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
