import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getMovieDetailsApi } from "../../../services/movie.api";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Heart, Play, Share2, Star } from "lucide-react";
import { useState } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [likedMovie, setLikedMovie] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeLogo, setActiveLogo] = useState("");
  const [activeTheater, setActiveTheater] = useState("");

  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetailsApi(movieId),
    enabled: !!movieId,
  });

  if (!movie) return;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 h-full flex items-center">
          <div className="grid lg:grid-cols-5 gap-12 items-center w-full">
            {/* Movie Poster */}
            <div className="lg:col-span-2">
              <div className="relative group max-w-md mx-auto">
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="w-full rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-red-600 hover:bg-red-700 p-6 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {movie.hot && (
                  <span className="bg-red-600 px-3 py-1 rounded-full font-semibold">
                    HOT
                  </span>
                )}
                <span className="text-gray-300">
                  {format(movie.ngayKhoiChieu, "yyyy")}
                </span>
                {movie.sapChieu && (
                  <span className="bg-blue-600 px-3 py-1 rounded-full font-semibold">
                    Coming Soon
                  </span>
                )}
                {movie.dangChieu && (
                  <span className="bg-green-600 px-3 py-1 rounded-full font-semibold">
                    Now Showing
                  </span>
                )}
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.tenPhim}
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {movie.moTa}
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= movie.danhGia / 2
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">{movie.danhGia}</span>
                  <span className="text-gray-400">/10</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>
                    Release Date: {format(movie.ngayKhoiChieu, "dd/MM/yyyy")}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                    ID: {movie.maPhim}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#showtime">
                  <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25">
                    <Play className="w-6 h-6 inline mr-2" />
                    Book Now
                  </button>
                </a>

                <button
                  onClick={() => setLikedMovie(!likedMovie)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    likedMovie
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "border border-gray-600 hover:border-white hover:bg-white hover:text-black"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${likedMovie ? "fill-current" : ""}`}
                  />
                </button>

                <button className="p-4 border border-gray-600 hover:border-white rounded-xl transition-all duration-300 hover:bg-white hover:text-black">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Movie Information</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Movie Title:</span>
                    <span className="text-white">{movie.tenPhim}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Movie ID:</span>
                    <span className="text-white">{movie.maPhim}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group:</span>
                    <span className="text-white">{movie.maNhom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="text-white">{movie.danhGia}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Release Date:</span>
                    <span className="text-white">
                      {format(movie.ngayKhoiChieu, "MM/dd/yyyy")}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        movie.hot ? "bg-red-500" : "bg-gray-500"
                      }`}
                    ></div>
                    <span
                      className={movie.hot ? "text-red-400" : "text-gray-400"}
                    >
                      {movie.hot ? "Hot Movie" : "Regular Movie"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        movie.dangChieu ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></div>
                    <span
                      className={
                        movie.dangChieu ? "text-green-400" : "text-gray-400"
                      }
                    >
                      {movie.dangChieu ? "Now Showing" : "Not Showing"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        movie.sapChieu ? "bg-blue-500" : "bg-gray-500"
                      }`}
                    ></div>
                    <span
                      className={
                        movie.sapChieu ? "text-blue-400" : "text-gray-400"
                      }
                    >
                      {movie.sapChieu ? "Coming Soon" : "Already Released"}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Trailer</h4>
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 underline text-sm break-all"
                  >
                    Watch trailer on YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Showtimes */}
            <div className="space-y-8" id="showtime">
              <h2 className="text-3xl font-bold">Showtimes & Booking</h2>

              <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden h-full mx-8">
                <div className="flex md:flex-col items-center md:items-start justify-center md:justify-start bg-white border-b md:border-b-0 md:border-r border-gray-300 p-0 gap-0 overflow-x-auto md:overflow-y-auto md:w-1/6">
                  {movie.heThongRapChieu.map((item) => (
                    <div
                      key={item.maHeThongRap}
                      className={`flex-shrink-0 cursor-pointer p-4 w-full text-center border-l-4 transition ${
                        activeLogo === item.maHeThongRap
                          ? "border-orange-500 bg-orange-50"
                          : "border-transparent hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveLogo(item.maHeThongRap)}
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
                  {movie.heThongRapChieu
                    ?.find((item) => item.maHeThongRap === activeLogo)
                    ?.cumRapChieu.map((rap) => (
                      <div
                        key={rap.maCumRap}
                        className={`p-4 cursor-pointer transition border-l-4 ${
                          activeTheater === rap.maCumRap
                            ? "border-orange-500 bg-orange-50"
                            : "border-transparent hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTheater(rap.maCumRap)}
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
                    movie.heThongRapChieu
                      ?.find((item) => item.maHeThongRap === activeLogo)
                      ?.cumRapChieu?.find(
                        (rap) => rap.maCumRap === activeTheater
                      )
                      ?.lichChieuPhim?.map((lich) => (
                        <button
                          key={lich.maLichChieu}
                          className="inline-block px-4 py-2 m-2 text-sm font-medium text-gray-700 
                     border border-gray-300 rounded-lg shadow-sm
                     hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 
                     transition cursor-pointer"
                          onClick={() =>
                            navigate(`/box-details/${lich.maLichChieu}`)
                          }
                        >
                          {format(lich.ngayChieuGioChieu, "hh:mm a")}
                        </button>
                      ))}
                </div>

                {(!movie.heThongRapChieu ||
                  movie.heThongRapChieu.length === 0) && (
                  <div className="text-center py-16 text-gray-400">
                    <Calendar className="w-16 h-16 mx-auto mb-6 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Showtimes Available
                    </h3>
                    <p>Showtimes for this movie are not currently available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/75 p-2 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400 mb-4">Trailer: {movie.tenPhim}</p>
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors inline-block"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
