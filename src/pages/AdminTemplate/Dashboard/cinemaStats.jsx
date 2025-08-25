import StatsCard from "./statsCard";
import { FaMapMarkerAlt, FaBuilding, FaFilm } from "react-icons/fa";

export default function CinemaStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard title="Số cụm rạp" value={12} icon={<FaBuilding />} bgColor="bg-[#3B38A0]" />
      <StatsCard title="Số hệ thống rạp" value={5} icon={<FaMapMarkerAlt />} bgColor="bg-[#3B38A0]" />
      <StatsCard title="Số rạp" value={25} icon={<FaFilm />} bgColor="bg-[#3B38A0]" />
    </div>
  );
}
