import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getAllListMovie } from "../../../services/movie.api";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function FilmChart() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [filmDataByYear, setFilmDataByYear] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await getAllListMovie();

        // Nhóm phim theo năm và tháng
        const groupedData = {};
        movies.forEach((movie) => {
          const date = new Date(movie.ngayKhoiChieu);
          const year = date.getFullYear();
          const month = date.getMonth(); // 0-11

          if (!groupedData[year]) {
            groupedData[year] = Array(12).fill(0);
          }
          groupedData[year][month] += 1;
        });

        setFilmDataByYear(groupedData);

        // Nếu năm được chọn chưa có dữ liệu thì set mặc định là năm đầu tiên
        if (!groupedData[selectedYear]) {
          const firstYear = Object.keys(groupedData)[0];
          setSelectedYear(firstYear);
        }
      } catch (err) {
        console.error("Lỗi load phim:", err);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const chartData = {
    labels: [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
      "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
      "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
    ],
    datasets: [
      {
        label: `Số lượng phim năm ${selectedYear}`,
        data: filmDataByYear[selectedYear] || Array(12).fill(0),
        borderColor: "#B2B0E8",
        tension: 0.3,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#B2B0E8",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#1A2A80",
        bodyColor: "#1A2A80",
        borderColor: "#3B38A0",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const month = context.label;
            const value = context.parsed.y;
            return `${month}: ${value} phim`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { color: "#ffffff" } },
      y: {
        beginAtZero: true,
        ticks: { color: "#ffffff" },
      },
    },
  };

  return (
    <div className="bg-[#7A85C1] rounded-lg shadow-md p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          Biểu đồ số lượng phim theo tháng ({selectedYear})
        </h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-[#B2B0E8] text-[#1A2A80] px-4 py-2 rounded-md font-semibold min-w-[140px]"
        >
          {Object.keys(filmDataByYear).map((year) => (
            <option key={year} value={year}>
              Năm {year}
            </option>
          ))}
        </select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}
