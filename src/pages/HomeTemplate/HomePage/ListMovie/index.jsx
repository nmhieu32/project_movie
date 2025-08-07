import { useQuery } from "@tanstack/react-query";
import Movie from "./Movie";
import { getListMoviesAPI } from "../../../../services/movie.api";
import SkeletonCard from "../../_components/Skeleton/SkeletonCard";
import { useState } from "react";

export default function ListMovie() {
  const [activeTabs, setTabs] = useState("hot");
  const tabs = [
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
    queryKey: ["list-movies"],
    queryFn: () => getListMoviesAPI("GP02"),
  });

  const renderListMovieWithHot = () => {
    if (movie) {
      const newMovie = [...movie].filter((item) => item.hot === true);
      return newMovie.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  const renderListMovieWithNowShowing = () => {
    if (movie) {
      const newMovie = [...movie].filter((item) => item.dangChieu === true);
      return newMovie.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  const renderListMovieWithComingSoon = () => {
    if (movie) {
      const newMovie = [...movie].filter((item) => item.sapChieu === true);
      return newMovie.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
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
      <ul className="flex mt-10 ml-6">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              className={`cursor-pointer ${
                activeTabs === tab.id
                  ? "text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  : "text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              }`}
              onClick={() => setTabs(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      {activeTabs === "hot" && (
        <div className="grid grid-cols-6 gap-4 mx-6">
          {renderListMovieWithHot()}
        </div>
      )}
      {activeTabs === "nowShowing" && (
        <div className="grid grid-cols-6 gap-4 mx-6">
          {renderListMovieWithNowShowing()}
        </div>
      )}
      {activeTabs === "comingSoon" && (
        <div className="grid grid-cols-6 gap-4 mx-6">
          {renderListMovieWithComingSoon()}
        </div>
      )}
    </div>
  );
}
