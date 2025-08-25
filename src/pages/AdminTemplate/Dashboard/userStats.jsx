import StatsCard from "./statsCard";
import { FaUserAlt, FaUserShield, FaUsers } from "react-icons/fa";
import { getAllUser } from "../../../services/user.api";
import { useQuery } from "@tanstack/react-query";

export default function UserStats() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUser,
  });

  if (isLoading) {
    return <p className="text-white">Đang tải dữ liệu...</p>;
  }

  const customers = users.filter((u) => u.maLoaiNguoiDung === "KhachHang").length;
  const admins = users.filter((u) => u.maLoaiNguoiDung === "QuanTri").length;
  const total = users.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <StatsCard
        title="Khách hàng"
        value={customers}
        icon={<FaUserAlt />}
        bgColor="bg-[#3B38A0]"
      />
      <StatsCard
        title="Quản trị viên"
        value={admins}
        icon={<FaUserShield />}
        bgColor="bg-[#3B38A0]"
      />
      <StatsCard
        title="Tổng người dùng"
        value={total}
        icon={<FaUsers />}
        bgColor="bg-[#3B38A0]"
      />
    </div>
  );
}
