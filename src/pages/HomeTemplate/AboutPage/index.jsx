import { Award, Calendar, Film, Play, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Film className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              CineMax
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Experience the magic of cinema like never before. Where stories come
            alive and memories are made under the stars of the silver screen.
          </p>
          <div className="flex items-center justify-center">
            <Play className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">Since 2001</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Our Cinematic Journey
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Born from a passion for storytelling, CineMax emerged in 2001
                  as more than just a movie theater. We envisioned a sanctuary
                  where audiences could escape reality and dive deep into the
                  worlds created by visionary filmmakers.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  From our humble single-screen beginning to becoming the city's
                  premier entertainment destination, we've never lost sight of
                  our core mission: creating unforgettable moments that linger
                  long after the credits roll.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Today, our theaters feature cutting-edge IMAX technology,
                  Dolby Atmos sound, and luxury reclining seats that transform
                  every screening into a premium experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  15+
                </div>
                <div className="text-purple-200 font-medium">
                  Premium Screens
                </div>
                <div className="text-sm text-purple-300 mt-2">
                  Including 3 IMAX theaters
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-800 to-indigo-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  2M+
                </div>
                <div className="text-blue-200 font-medium">Happy Guests</div>
                <div className="text-sm text-blue-300 mt-2">
                  And counting every day
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-800 to-teal-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  20+
                </div>
                <div className="text-green-200 font-medium">Years of Magic</div>
                <div className="text-sm text-green-300 mt-2">
                  Creating memories since 2001
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-800 to-orange-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  500+
                </div>
                <div className="text-red-200 font-medium">Epic Movies</div>
                <div className="text-sm text-red-300 mt-2">
                  From blockbusters to indies
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
              The CineMax Difference
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every detail crafted for the ultimate cinematic experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Premium Experience
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                State-of-the-art screens, crystal-clear 4K projection, and
                luxury leather recliners for ultimate comfort.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Family Sanctuary
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Safe, immaculate environment where families create lasting
                memories together in comfort and style.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Flexible Showtimes
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                From early morning to late night, with special midnight
                premieres and weekend marathon events.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Award Winning
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Consistently rated #1 cinema experience in the city for customer
                service and technical excellence.
              </p>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-3xl p-12 md:p-16 border border-gray-700 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <div className="relative text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-10">
                At CineMax, we believe cinema is more than entertainment – it's
                a portal to infinite worlds, a catalyst for emotions, and a
                bridge between cultures. Our mission is to create extraordinary
                experiences that ignite imagination, foster connections, and
                leave audiences inspired long after they leave our theaters.
              </p>
              <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 inline-block border border-purple-500">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                  "Where Every Story Becomes Your Story"
                </p>
                <p className="text-purple-300 font-medium">
                  — The CineMax Promise
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
