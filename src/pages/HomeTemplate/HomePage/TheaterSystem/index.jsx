import { useQuery } from "@tanstack/react-query";
import { getTheaterDetailApi } from "./../../../../services/movie.api";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveLogo,
  setActiveTheater,
} from "../../../../store/theater.slice";
import { format } from "date-fns";
import SkeletonTheater from "../../_components/Skeleton/theater.skeleton";
import { useNavigate } from "react-router-dom";

export default function TheaterSystem() {
  const { activeLogo, activeTheater } = useSelector(
    (state) => state.theaterSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
            Theater System
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the appropriate theater and show time
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row h-[600px]">
            <div className="flex lg:flex-col items-center lg:items-start justify-start bg-white/5 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/10 p-2 gap-1 overflow-x-auto lg:overflow-y-auto lg:w-1/6 scrollbar-hide">
              <div className="flex lg:flex-col gap-1 w-full">
                {theater?.map((item) => (
                  <div
                    key={item.maHeThongRap}
                    className={`group flex-shrink-0 cursor-pointer p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      activeLogo === item.maHeThongRap
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25"
                        : "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                    }`}
                    onClick={() => dispatch(setActiveLogo(item.maHeThongRap))}
                  >
                    <div className="relative">
                      <img
                        className={`w-16 h-16 object-contain mx-auto transition-all duration-300 ${
                          activeLogo === item.maHeThongRap
                            ? ""
                            : "group-hover:brightness-110"
                        }`}
                        src={item.logo}
                        alt={item.biDanh}
                      />
                      {activeLogo === item.maHeThongRap && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 bg-white/5 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto scrollbar-hide">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  List of theaters
                </h3>
                <div className="space-y-2">
                  {theater
                    ?.find((item) => item.maHeThongRap === activeLogo)
                    ?.lstCumRap.map((rap) => (
                      <div
                        key={rap.maCumRap}
                        className={`group p-4 cursor-pointer rounded-xl transition-all duration-300 border-l-4 ${
                          activeTheater === rap.maCumRap
                            ? "border-orange-500 bg-gradient-to-r from-orange-500/20 to-transparent backdrop-blur-sm"
                            : "border-transparent hover:bg-white/10 hover:border-orange-300"
                        }`}
                        onClick={() => dispatch(setActiveTheater(rap.maCumRap))}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-3 h-3 rounded-full mt-1 ${
                              activeTheater === rap.maCumRap
                                ? "bg-orange-500 shadow-lg shadow-orange-500/50"
                                : "bg-gray-500 group-hover:bg-orange-300"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <h4
                              className={`text-sm font-semibold transition-colors ${
                                activeTheater === rap.maCumRap
                                  ? "text-orange-400"
                                  : "text-blue-400 group-hover:text-orange-300"
                              }`}
                            >
                              {rap.tenCumRap}
                            </h4>
                            <p
                              className={`text-xs mt-1 line-clamp-2 ${
                                activeTheater === rap.maCumRap
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            >
                              {rap.diaChi}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 overflow-y-auto scrollbar-hide">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Movie showtimes
                </h3>
                <p className="text-gray-400 text-sm">
                  Choose the screening time that's right for you
                </p>
              </div>

              {activeTheater && (
                <div className="space-y-6">
                  {theater
                    ?.find((item) => item.maHeThongRap === activeLogo)
                    ?.lstCumRap?.find((rap) => rap.maCumRap === activeTheater)
                    ?.danhSachPhim?.map((movie) => (
                      <div
                        key={movie.maPhim}
                        className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-orange-500/30"
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="relative flex-shrink-0">
                            <img
                              src={movie.hinhAnh}
                              alt={movie.tenPhim}
                              className="w-32 h-44 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            />
                            {movie.hot && (
                              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                🔥
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div>
                              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                {movie.tenPhim}
                              </h2>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                                Showtime:
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {movie.lstLichChieuTheoPhim
                                  .slice(0, 6)
                                  .map((gio) => (
                                    <button
                                      key={gio.maLichChieu}
                                      className="group/time relative px-4 py-2 bg-gradient-to-r from-teal-600/20 to-blue-600/20 border border-teal-500/50 rounded-xl text-teal-300 text-sm font-medium transition-all duration-300 hover:from-orange-600/30 hover:to-orange-500/30 hover:border-orange-500/70 hover:text-orange-300 hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
                                      onClick={() => {
                                        const userLocal = JSON.parse(
                                          localStorage.getItem("user")
                                        );
                                        if (userLocal) {
                                          return navigate(
                                            `/box-details/${gio.maLichChieu}`
                                          );
                                        }
                                        navigate("/login");
                                      }}
                                    >
                                      <span className="relative z-10">
                                        {format(
                                          gio.ngayChieuGioChieu,
                                          "hh:mm a"
                                        )}
                                      </span>
                                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-orange-600/0 group-hover/time:from-orange-500/20 group-hover/time:to-orange-600/20 transition-all duration-300"></div>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {activeTheater &&
                !theater
                  ?.find((item) => item.maHeThongRap === activeLogo)
                  ?.lstCumRap?.find((rap) => rap.maCumRap === activeTheater)
                  ?.danhSachPhim?.length && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-600/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                      There are no movies shown
                    </h3>
                    <p className="text-gray-400">
                      This theater currently has no movie showings scheduled.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            💡 Select a theater in the left column, then select the appropriate
            theater complex and showtime
          </p>
        </div>
      </div>
    </div>
  );
}
