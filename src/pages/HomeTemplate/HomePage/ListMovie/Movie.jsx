import { Clock, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;
  const navigate = useNavigate();
  const handleViewDetails = () => {
    if (!movie.maPhim) return;
    navigate(`/movie-details/${movie.maPhim}`);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100"
      onClick={handleViewDetails}
    >
      {/* Image container với overlay */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          src={movie.hinhAnh}
          alt={movie.biDanh}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>

        {/* Hot badge */}
        {movie.hot && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            🔥 HOT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h5 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
          {movie.tenPhim}
        </h5>

        {/* Rating và thông tin thêm (nếu có) */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="font-medium">{Math.floor(movie.danhGia / 2)}</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= movie.danhGia / 2
                    ? "text-yellow-400 fill-current"
                    : "hidden"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
