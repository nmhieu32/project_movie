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
            ⚠️ Không thể tải dữ liệu footer. Vui lòng thử lại sau.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#15222B] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="./images/logo.png"
              alt="Logo"
              className="size-20 mb-2 rounded-[50%]"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-2">PARTNER</h3>
            <div className="flex gap-4">
              {data?.map((item) => (
                <img key={item.maHeThongRap}
                  src={item.logo}
                  alt="Partner 1"
                  className="h-10 w-10 rounded-full bg-white"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-2">Link</h3>
            <div className="flex flex-col gap-4">
              <a
                href="http://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-6 pt-4 text-xs text-center md:text-left">
          ©2025 All rights reserved
        </div>
      </div>
    </footer>
  );
}
