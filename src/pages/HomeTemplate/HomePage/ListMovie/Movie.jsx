export default function Movie(props) {
  const { movie } = props;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg size-70 object-cover"
          src={movie.hinhAnh}
          alt={movie.biDanh}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {movie.tenPhim}
          </h5>
        </a>
      </div>
    </div>
  );
}
