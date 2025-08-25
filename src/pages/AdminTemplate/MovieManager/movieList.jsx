import React, { useState } from "react";
import MovieRow from "./movieRow";
import EditMovieModal from "./editMovieModal";
import { getAllListMovie } from "../../../services/movie.api";
import { useQuery } from "@tanstack/react-query";

export default function MovieList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);

  const itemsPerPage = 5;

  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ["all-movies"],
    queryFn: getAllListMovie,
  });

  if (isLoading) return <p>Đang tải...</p>;
  if (isError) return <p>Có lỗi xảy ra khi tải phim!</p>;

  const sortedMovies = [...movies].sort((a, b) => {
    if (!sortOrder) return 0;
    const dateA = new Date(a.ngayKhoiChieu);
    const dateB = new Date(b.ngayKhoiChieu);
    if (sortOrder === "asc") return dateA - dateB;
    if (sortOrder === "desc") return dateB - dateA;
    return 0;
  });

  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = sortedMovies.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = () => {
    setSortOrder(prev => (prev === null ? "asc" : prev === "asc" ? "desc" : null));
    setCurrentPage(1);
  };

  return (
    <div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">STT</th>
            <th className="p-2">Tên phim</th>
            <th className="p-2">Hình ảnh</th>
            <th className="p-2 cursor-pointer select-none" onClick={toggleSort}>
              Ngày khởi chiếu {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "⬍"}
            </th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Hot</th>
            <th className="p-2">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {currentMovies.map((movie, i) => (
            <MovieRow
              key={movie.maPhim}
              movie={movie}
              index={startIndex + i + 1}
              onEdit={() => setEditingMovie(movie)}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal Edit nằm ngoài table */}
      {editingMovie && (
        <EditMovieModal
          movie={editingMovie}
          onClose={() => setEditingMovie(null)}
          onUpdate={(updated) => {
            console.log("Phim sau cập nhật:", updated);
            setEditingMovie(null);
          }}
        />
      )}
    </div>
  );
}
