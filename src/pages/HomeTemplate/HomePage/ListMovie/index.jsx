import { useQuery } from "@tanstack/react-query";
import Movie from "./Movie";
import { getListMoviesAPI } from "../../../../services/movie.api";

export default function ListMovie() {
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-movies"],
    queryFn: () => getListMoviesAPI("GP02"),
  });

  const renderListMovie = () => {
    if (movie) {
      return movie.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-6 gap-4 mx-6">{renderListMovie()}</div>
    </div>
  );
}
