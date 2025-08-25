import React, { useState } from "react";
import { MoreVertical, Flame, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { deleteMovie } from "../../../services/movie.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MovieDetailModal from "./movieDetailModal"; // import modal

export default function MovieRow({ movie, index, onEdit }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // state cho modal
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: (maPhim) => deleteMovie(maPhim),
    onSuccess: () => {
      queryClient.invalidateQueries(["listMovie"]);
    },
    onError: (error) => {
      console.error("❌ Xóa phim thất bại:", error);
      alert("Xóa phim thất bại!");
    },
  });

  return (
    <>
      <tr className="border-b border-gray-600 hover:bg-gray-800">
        <td className="p-2 w-12">{index}</td>
        <td className="p-2 max-w-[200px] truncate">{movie.tenPhim}</td>
        <td className="p-2">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-16 h-16 object-cover rounded"
          />
        </td>
        <td className="p-2 max-w-[150px] truncate">
          {format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy HH:mm")}
        </td>
        <td className="p-2 max-w-[120px] truncate">
          {movie.dangChieu
            ? "Đang chiếu"
            : movie.sapChieu
            ? "Sắp chiếu"
            : "Đã chiếu"}
        </td>
        <td className="p-2">{movie.hot && <Flame className="text-red-500" />}</td>
        <td className="relative p-2 w-20">
          <button onClick={() => setOpenMenu(!openMenu)}>
            <MoreVertical />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 bg-gray-700 rounded shadow-lg z-10 w-32">
              <button
                className="flex items-center px-3 py-2 hover:bg-gray-600 w-full"
                onClick={() => {
                  setShowDetail(true);
                  setOpenMenu(false);
                }}
              >
                <Eye size={16} className="mr-2" /> Detail
              </button>
              <button
                className="flex items-center px-3 py-2 hover:bg-gray-600 w-full"
                onClick={() => {
                  onEdit();
                  setOpenMenu(false);
                }}
              >
                <Edit size={16} className="mr-2" /> Edit
              </button>
              <button
                className="flex items-center px-3 py-2 hover:bg-gray-600 w-full text-red-400"
                onClick={() => {
                  if (window.confirm(`Bạn có chắc muốn xóa phim "${movie.tenPhim}"?`)) {
                    handleDelete(movie.maPhim);
                  }
                  setOpenMenu(false);
                }}
              >
                <Trash2 size={16} className="mr-2" /> Xóa
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Modal hiển thị chi tiết */}
      {showDetail && (
        <MovieDetailModal
          movie={movie}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
