import CinemaStats from "./cinemaStats";
import UserStats from "./userStats";
import FilmChart from "./filmChart";

export default function Dashboard() {
  return (
    <div className="p-6 bg-[#252746] opacity-95  min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* <CinemaStats /> */}
      <UserStats />
      <FilmChart />
    </div>
  );
}
