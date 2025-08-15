import { useNavigate } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;
const navigate = useNavigate();
  const handleViewDetails = () => {
    if(!movie.maPhim) return;
    navigate(`/movie-details/${movie.maPhim}`)
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" onClick={handleViewDetails}>
        <img
          className="rounded-t-lg size-70 object-cover"
          src={movie.hinhAnh}
          alt={movie.biDanh}
        />
      <div className="p-5">
        
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {movie.tenPhim}
          </h5>
        
      </div>
    </div>
  );
}
