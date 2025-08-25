import React from "react";
import { format } from "date-fns";

export default function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden">
        {/* Nút close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Poster */}
          <div className="flex items-center justify-center bg-gray-800 p-4">
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className="rounded-xl shadow-lg w-full max-h-[500px] object-cover"
            />
          </div>

          {/* Nội dung */}
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              {movie.tenPhim}
            </h2>
            <div className="space-y-3 text-base">
              <p>
                <span className="font-semibold">Mã phim:</span> {movie.maPhim}
              </p>
              <p>
                <span className="font-semibold">Bí danh:</span> {movie.biDanh}
              </p>
              <p>
                <span className="font-semibold">Trailer:</span>{" "}
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  Xem trailer
                </a>
              </p>
              <p>
                <span className="font-semibold">Mô tả:</span>{" "}
                {movie.moTa || "Không có"}
              </p>
              <p>
                <span className="font-semibold">Ngày khởi chiếu:</span>{" "}
                {format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy")}
              </p>
              <p>
                <span className="font-semibold">Đánh giá:</span> ⭐ {movie.danhGia}/10
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span>{" "}
                {movie.dangChieu
                  ? "🎬 Đang chiếu"
                  : movie.sapChieu
                  ? "⏳ Sắp chiếu"
                  : "📽️ Đã chiếu"}
              </p>
              <p>
                <span className="font-semibold">Hot:</span>{" "}
                {movie.hot ? "🔥 Có" : "Không"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
