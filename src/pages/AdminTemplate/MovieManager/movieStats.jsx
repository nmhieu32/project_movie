import React from "react";
import StatCard from "./statCard";
import { Flame, Film, CalendarClock, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllListMovie } from "../../../services/movie.api";
import { Loader2 } from "lucide-react";

export default function MovieStats() {
  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ["listMovie"],
    queryFn: getAllListMovie,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <span className="ml-2">Đang tải thống kê phim...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Lỗi khi tải dữ liệu phim!
      </div>
    );
  }

  // Tính toán số lượng phim
  const hot = movies.filter((m) => m.hot).length;
  const dangChieu = movies.filter((m) => m.dangChieu).length;
  const sapChieu = movies.filter((m) => m.sapChieu).length;
  // const daChieu = movies.filter((m) => !m.dangChieu && !m.sapChieu).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Phim Hot" value={hot} icon={Flame} color="text-red-500" />
      <StatCard title="Đang chiếu" value={dangChieu} icon={Film} color="text-blue-400" />
      <StatCard title="Sắp chiếu" value={sapChieu} icon={CalendarClock} color="text-yellow-400" />
      {/* <StatCard title="Đã chiếu" value={daChieu} icon={History} color="text-green-400" /> */}
    </div>
  );
}
