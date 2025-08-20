import { CreditCard, Film } from "lucide-react";

export default function SkeletonBooking() {
  return (
    <div className="list-chair min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 pt-24 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-10 w-64 bg-gray-700 mx-auto rounded mb-2"></div>
          <div className="w-24 h-1 bg-gray-700 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="h-8 w-48 bg-gray-700 mx-auto mb-6 rounded"></div>

              <div className="mb-8">
                <div className="bg-gray-700 h-4 rounded-full mx-auto mb-3 w-4/5"></div>
                <div className="h-4 w-24 bg-gray-700 mx-auto rounded"></div>
              </div>

              <div className="flex justify-center gap-6 mb-8 text-sm flex-wrap">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-700 rounded"></div>
                    <div className="h-3 w-16 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-16 gap-2 justify-items-center"
                  >
                    {[...Array(16)].map((_, j) => (
                      <div
                        key={j}
                        className="w-6 h-6 bg-gray-700 rounded"
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
                <h2 className="text-xl font-bold text-yellow-400 flex items-center">
                  <Film className="w-6 h-6 mr-3" />
                  <div className="h-5 w-32 bg-gray-700 rounded"></div>
                </h2>
              </div>
              <div className="p-6">
                <div className="w-full h-64 bg-gray-700 rounded-xl mb-6"></div>
                <div className="space-y-3">
                  <div className="h-5 w-40 bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  <div className="h-4 w-28 bg-gray-700 rounded"></div>
                  <div className="h-4 w-36 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-6">
              <h2 className="text-xl font-bold text-yellow-400 flex items-center mb-6">
                <CreditCard className="w-6 h-6 mr-3" />
                <div className="h-5 w-32 bg-gray-700 rounded"></div>
              </h2>

              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded"></div>
                      <div>
                        <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 w-16 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="h-5 w-24 bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-700 rounded"></div>
              </div>
              <div className="w-full h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}