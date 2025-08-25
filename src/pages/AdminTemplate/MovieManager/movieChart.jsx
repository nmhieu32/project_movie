import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getAllListMovie } from "../../../services/movie.api";
import { Loader2 } from "lucide-react";

// Đăng ký chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MovieLineChart() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // fetch movies từ API
  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ["listMovie"],
    queryFn: getAllListMovie,
  });

  // labels cho 12 tháng
  const labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);

  // Hàm đếm số phim theo tháng và loại
  const countMoviesByMonth = (condition) => {
    return labels.map((_, i) => {
      const month = i + 1;
      return movies.filter((m) => {
        const date = new Date(m.ngayKhoiChieu);
        return (
          date.getFullYear() === selectedYear &&
          date.getMonth() + 1 === month &&
          condition(m)
        );
      }).length;
    });
  };

  // dữ liệu cho 3 line
  const data = {
    labels,
    datasets: [
      {
        label: "Phim Hot",
        data: countMoviesByMonth((m) => m.hot),
        borderColor: "rgba(239,68,68,1)", // đỏ
        backgroundColor: "rgba(239,68,68,0.3)",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Đang chiếu",
        data: countMoviesByMonth((m) => m.dangChieu),
        borderColor: "rgba(59,130,246,1)", // xanh
        backgroundColor: "rgba(59,130,246,0.3)",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Đã chiếu",
        data: countMoviesByMonth((m) => !m.dangChieu && !m.sapChieu),
        borderColor: "rgba(34,197,94,1)", // xanh lá
        backgroundColor: "rgba(34,197,94,0.3)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: `Thống kê phim năm ${selectedYear}`,
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <span className="ml-2">Đang tải dữ liệu biểu đồ...</span>
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

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      {/* Select chọn năm */}
      <div className="mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-gray-800 text-white px-7 py-2 rounded"
        >
          {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
            <option key={year} value={year}>
              Năm {year}
            </option>
          ))}
        </select>
      </div>

      {/* Biểu đồ đường */}
      <Line data={data} options={options} />
    </div>
  );
}
