import { useQuery } from "@tanstack/react-query";
import Movie from "./Movie";
import { getListMoviesAPI } from "../../../../services/movie.api";
import SkeletonCard from "../../_components/Skeleton/card.theater";
import { useState } from "react";

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
    keepPreviousData: true, //chặn giật màn hình
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
    <div className="container mx-auto w-4/5">
      <ul className="flex ml-6">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              className={`cursor-pointer ${
                activeTabs === tab.id
                  ? "text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  : "text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              }`}
              onClick={() => setTabs(tab.id)}
            >
              {tab.label === "Hot" ? `${tab.label} 🔥` : `${tab.label}`}
            </button>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-6 gap-4 mx-6">
        {activeTabs === "all" && renderMovies()}
        {activeTabs === "hot" && renderMovies((m) => m.hot)}
        {activeTabs === "nowShowing" && renderMovies((m) => m.dangChieu)}
        {activeTabs === "comingSoon" && renderMovies((m) => m.sapChieu)}
      </div>

      {movie?.totalPages > 1 && (
        <nav aria-label="Page navigation" className="flex justify-center mt-6">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-2 ml-0 leading-tight border border-gray-700 rounded-l-lg transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white"
                }`}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: movie.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 leading-tight border border-gray-700 transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              )
            )}

            <li>
              <button
                disabled={currentPage === movie.totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-2 leading-tight border border-gray-700 rounded-r-lg transition-colors duration-200 ${
                  currentPage === movie.totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
