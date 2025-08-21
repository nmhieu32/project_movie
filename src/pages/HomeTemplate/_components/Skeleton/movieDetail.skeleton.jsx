export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white animate-pulse">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gray-800"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 h-full flex items-center">
          <div className="grid lg:grid-cols-5 gap-12 items-center w-full">
            <div className="lg:col-span-2">
              <div className="w-80 h-[450px] bg-gray-700 rounded-2xl mx-auto"></div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-10 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
              </div>

              <div className="h-12 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>

              <div className="flex gap-6 items-center">
                <div className="flex space-x-1">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gray-700 rounded"
                      ></div>
                    ))}
                </div>
                <div className="h-6 w-12 bg-gray-700 rounded"></div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-36 bg-gray-700 rounded-xl"></div>
                <div className="h-12 w-12 bg-gray-700 rounded-xl"></div>
                <div className="h-12 w-12 bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="h-6 w-40 bg-gray-700 rounded"></div>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-32 bg-gray-700 rounded"></div>
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                  </div>
                ))}
            </div>

            <div className="space-y-3">
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
              {Array(3)
                .fill()
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-700 rounded"></div>
                  </div>
                ))}
              <div className="h-4 w-40 bg-gray-700 rounded mt-6"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-8 w-60 bg-gray-700 rounded"></div>
            <div className="h-64 w-full bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
