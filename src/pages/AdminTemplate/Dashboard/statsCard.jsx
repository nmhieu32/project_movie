export default function StatsCard({ title, value, icon, bgColor }) {
  return (
    <div className={`shadow-md rounded-lg p-4 flex items-center gap-4 ${bgColor}`}>
      <div className="text-3xl text-white">{icon}</div>
      <div>
        <p className="text-[#B2B0E8] text-sm">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
