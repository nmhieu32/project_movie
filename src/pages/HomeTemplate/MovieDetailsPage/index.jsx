import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getMovieDetailsApi } from '../../../services/movie.api'
import { useParams } from 'react-router-dom'

export default function MovieDetailsPage() {
    const {movieId} = useParams()

    const {data: movie, isLoading, isError} = useQuery({
        queryKey: ["movie-details", movieId],
        queryFn: () => getMovieDetailsApi(movieId),
        enabled: !!movieId
    })

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <img
            src={movie?.hinhAnh}
            className="size-100 object-cover rounded-md shadow-2xl"
            alt={movie?.biDanh}
          />
        </div>
        <div className="col-span-4 space-y-4">
          <h1 className="text-2xl font-bold">Tên phim: {movie?.tenPhim}</h1>
          <p className="text-lg">Mô tả: {movie?.moTa}</p>
          <p className="text-lg">
            Ngày chiếu:{" "}
            {movie?.ngayKhoiChieu
              ? format(movie.ngayKhoiChieu, "dd/MM/yyyy")
              : ""}
          </p>
        </div>
      </div>
    </div>
  )
}
