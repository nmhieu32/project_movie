import { useQuery } from "@tanstack/react-query";
import { getTheaterDetailApi } from "./../../../../services/movie.api";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveLogo,
  setActiveTheater,
} from "../../../../store/theater.slice";
import { format } from "date-fns";
import SkeletonTheater from "../../_components/Skeleton/theater.skeleton";

export default function TheaterSystem() {
  const { activeLogo, activeTheater } = useSelector(
    (state) => state.theaterSlice
  );
  const dispatch = useDispatch();

  const {
    data: theater,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["theater-system"],
    queryFn: () => getTheaterDetailApi("GP02"),
  });

  if (isLoading) return <SkeletonTheater />;
  if (isError)
    return (
      <div className="text-center">
        <h1>Not Found</h1>
      </div>
    );

  return (
    <>
      <h1 className="text-center text-2xl font-bold mx-4 my-10 text-white">
        Theater System
      </h1>

      <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden h-full mx-8">
        <div className="flex md:flex-col items-center md:items-start justify-center md:justify-start bg-white border-b md:border-b-0 md:border-r border-gray-300 p-0 gap-0 overflow-x-auto md:overflow-y-auto md:w-1/6">
          {theater?.map((item) => (
            <div
              key={item.maHeThongRap}
              className={`flex-shrink-0 cursor-pointer p-4 w-full text-center border-l-4 transition ${
                activeLogo === item.maHeThongRap
                  ? "border-orange-500 bg-orange-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => dispatch(setActiveLogo(item.maHeThongRap))}
            >
              <img
                className="w-16 h-16 object-contain mx-auto"
                src={item.logo}
                alt={item.biDanh}
              />
            </div>
          ))}
        </div>

        <div className="md:w-1/3 bg-white border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
          {theater
            ?.find((item) => item.maHeThongRap === activeLogo)
            ?.lstCumRap.map((rap) => (
              <div
                key={rap.maCumRap}
                className={`p-4 cursor-pointer transition border-l-4 ${
                  activeTheater === rap.maCumRap
                    ? "border-orange-500 bg-orange-50"
                    : "border-transparent hover:bg-gray-50"
                }`}
                onClick={() => dispatch(setActiveTheater(rap.maCumRap))}
              >
                <h3 className="text-sm font-semibold text-blue-500">
                  {rap.tenCumRap}
                </h3>
                <p className="text-xs text-gray-500">{rap.diaChi}</p>
              </div>
            ))}
        </div>

        <div className="flex-1 bg-white p-4 overflow-y-auto">
          {activeTheater &&
            theater
              ?.find((item) => item.maHeThongRap === activeLogo)
              ?.lstCumRap?.find((rap) => rap.maCumRap === activeTheater)
              ?.danhSachPhim?.map((movie) => (
                <div
                  key={movie.maPhim}
                  className="flex flex-col sm:flex-row mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    className="w-28 h-40 object-cover rounded mb-2 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">
                      {movie.hot ? `${movie.tenPhim} 🔥` : `${movie.tenPhim}`}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {movie.lstLichChieuTheoPhim.slice(0,6).map((gio) => (
                        <span
                          key={gio.maLichChieu}
                          className="px-3 py-1 bg-teal-50 text-teal-500 border border-teal-500 rounded text-sm font-medium line-clamp-2"
                        >
                          {format(gio.ngayChieuGioChieu, "hh:mm a")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
