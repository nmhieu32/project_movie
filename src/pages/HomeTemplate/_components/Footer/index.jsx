import { useQuery } from "@tanstack/react-query";
import { getTheaterDetailApi } from "../../../../services/movie.api";
import FooterSkeleton from "../Skeleton/footer.skeleton";

export default function Footer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["footer-partner"],
    queryFn: () => getTheaterDetailApi("GP02"),
  });

  if (isLoading) return <FooterSkeleton />;
  if (isError) {
    return (
      <footer className="bg-[#15222B] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-400 font-medium">
            ⚠️ Unable to load footer data. Please try again later.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-[#15222B] to-black overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] bg-[length:50px_50px]"></div>
  </div>

  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"></div>

  <div className="relative z-10 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <img
                src="/images/logo.png"
                alt="Logo"
                className="relative w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-xl"
              />
            </div>
            <div className="text-center md:text-left mt-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                CineMax
              </h2>
              <p className="text-gray-400 mt-2 max-w-md">
                Experience the ultimate cinema with modern technology and excellent service. 
                Where stories are told through light and sound.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors">
              <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-400 text-xs">📍</span>
              </div>
              <span>123 Nguyen Hue, District 1, City. Ho Chi Minh</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors">
              <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-400 text-xs">📞</span>
              </div>
              <span>1900 6017</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors">
              <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-400 text-xs">✉️</span>
              </div>
              <span>info@cinemax.com</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              PARTNER
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 w-full max-w-[200px]">
            {data?.map((item) => (
              <div
                key={item.maHeThongRap}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={item.logo}
                    alt="Partner"
                    className="w-full h-8 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              CONNECT
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
          </div>

          <div className="space-y-4">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 transform hover:translate-x-1"
            >
              <div className="w-8 h-8 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 group-hover:border-blue-500/50 transition-all duration-300">
                <span className="text-blue-400 text-sm">📘</span>
              </div>
              <span className="font-medium">Facebook</span>
            </a>

            <a
              href="http://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 transform hover:translate-x-1"
            >
              <div className="w-8 h-8 bg-pink-600/20 backdrop-blur-sm border border-pink-500/30 rounded-lg flex items-center justify-center group-hover:bg-pink-600/30 group-hover:border-pink-500/50 transition-all duration-300">
                <span className="text-pink-400 text-sm">📷</span>
              </div>
              <span className="font-medium">Instagram</span>
            </a>

            <a
              href="http://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 transform hover:translate-x-1"
            >
              <div className="w-8 h-8 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-lg flex items-center justify-center group-hover:bg-red-600/30 group-hover:border-red-500/50 transition-all duration-300">
                <span className="text-red-400 text-sm">📺</span>
              </div>
              <span className="font-medium">YouTube</span>
            </a>

            <a
              href="http://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 transform hover:translate-x-1"
            >
              <div className="w-8 h-8 bg-gray-600/20 backdrop-blur-sm border border-gray-500/30 rounded-lg flex items-center justify-center group-hover:bg-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300">
                <span className="text-gray-400 text-sm">🎵</span>
              </div>
              <span className="font-medium">TikTok</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 CineMax. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Made with ❤️ in Vietnam
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of use</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="absolute top-10 right-10 w-2 h-2 bg-orange-500/30 rounded-full animate-pulse"></div>
  <div className="absolute bottom-20 left-10 w-1 h-1 bg-orange-400/20 rounded-full animate-pulse delay-1000"></div>
  <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-orange-600/20 rounded-full animate-pulse delay-500"></div>
</footer>
  );
}
