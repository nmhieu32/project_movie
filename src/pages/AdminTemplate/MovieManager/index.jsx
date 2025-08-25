import React, { useState } from "react";
import MovieList from "./movieList";
import AddMovieForm from "./addMovieForm";
import MovieStats from "./movieStats";
import MovieChart from "./movieChart";

const dummyMovies = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  tenPhim: `Movie ${i + 1}`,
  hinhAnh: "https://via.placeholder.com/80",
  ngayKhoiChieu: `2025-09-${String((i % 30) + 1).padStart(2, "0")}T14:30`,
  dangChieu: i % 3 === 0,
  sapChieu: i % 3 === 1,
  hot: i % 5 === 0,
}));

export default function MovieManager() {
  const [movies, setMovies] = useState(dummyMovies);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(false);

  const handleAddMovie = (movie) => {
    setMovies([
      ...movies,
      {
        id: Date.now(),
        tenPhim: movie.tenPhim || "Không có tên",
        hinhAnh: movie.hinhAnh || "https://via.placeholder.com/80",
        ngayKhoiChieu: movie.ngayKhoiChieu || "2025-01-01T00:00",
        dangChieu: movie.dangChieu ?? false,
        sapChieu: movie.sapChieu ?? false,
        hot: movie.hot ?? false,
      },
    ]);
    setShowForm(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  // Lọc phim theo từ khóa
  const filteredMovies = movies.filter((m) =>
    m.tenPhim.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#252746] opacity-95 min-h-screen text-white p-5 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 px-4 py-2 rounded shadow">
          Thêm phim thành công!
        </div>
      )}

      <MovieStats movies={movies} />

      {/* Search + Button thêm phim */}
      <div className="flex justify-between items-center">
        {/* <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="px-3 py-2 rounded text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          + Thêm phim
        </button>
      </div>

      {/* Danh sách chính */}
      <MovieList movies={movies} />

      {/* Kết quả tìm kiếm */}
      {search && filteredMovies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Kết quả tìm kiếm:</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-2">STT</th>
                <th className="p-2">Tên phim</th>
                <th className="p-2">Hình ảnh</th>
                <th className="p-2">Ngày khởi chiếu</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Hot</th>
                <th className="p-2">Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie, i) => (
                <MovieRow key={movie.id} movie={movie} index={i + 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MovieChart movies={movies} />

      {/* Modal thêm phim */}
      {showForm && (
        <AddMovieForm onClose={() => setShowForm(false)} onAdd={handleAddMovie} />
      )}
    </div>
  );
}
