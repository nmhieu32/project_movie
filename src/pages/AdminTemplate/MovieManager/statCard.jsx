import React from "react";

export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {Icon && <Icon className={`w-8 h-8 ${color}`} />}
    </div>
  );
}
