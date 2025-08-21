import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Movie from "./Movie";
import { getListMoviesAPI } from "../../../../services/movie.api";
import SkeletonCard from "../../_components/Skeleton/card.theater";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ListMovie() {
  const [activeTabs, setTabs] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tabs = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "hot",
      label: "Hot",
    },
    {
      id: "nowShowing",
      label: "Now Showing",
    },
    {
      id: "comingSoon",
      label: "Coming Soon",
    },
  ];

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-movies", currentPage],
    queryFn: () => getListMoviesAPI("GP01", currentPage, { hot: true }),
    placeholderData: keepPreviousData,
  });

  const renderMovies = (filterFn) => {
    if (!movie) return null;
    const list = filterFn ? movie.items.filter(filterFn) : movie.items;
    return list.map((item) => <Movie key={item.maPhim} movie={item} />);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-4 mx-6 space-y-4">
          {[...Array(12)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          MOVIES
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                activeTabs === tab.id
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-orange-600"
              }`}
              onClick={() => setTabs(tab.id)}
            >
              {tab.label === "Hot" ? (
                <span className="flex items-center gap-2">
                  {tab.label} <span className="text-lg">🔥</span>
                </span>
              ) : (
                tab.label
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-12">
        {activeTabs === "all" && renderMovies()}
        {activeTabs === "hot" && renderMovies((m) => m.hot)}
        {activeTabs === "nowShowing" && renderMovies((m) => m.dangChieu)}
        {activeTabs === "comingSoon" && renderMovies((m) => m.sapChieu)}
      </div>

      {movie?.totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            <ul className="flex items-center space-x-1">
              <li>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-md"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
              </li>

              <div className="flex items-center space-x-1 mx-2">
                {Array.from({ length: movie.totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-medium text-sm transition-all duration-200 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                            : "bg-gray-50 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-md"
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
              </div>

              <li>
                <button
                  disabled={currentPage === movie.totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    currentPage === movie.totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-md"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
