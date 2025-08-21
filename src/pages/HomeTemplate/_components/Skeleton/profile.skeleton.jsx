export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="h-5 w-40 bg-gray-200 rounded"></div>
                <div className="h-9 w-28 bg-gray-200 rounded"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`${i === 4 ? "md:col-span-2" : ""}`}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full"></div>
              <div className="h-5 w-32 bg-gray-200 rounded mx-auto mt-4"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mx-auto mt-2"></div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
