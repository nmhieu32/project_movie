import { Calendar, Clock, CreditCard, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export default function BookingHistory() {
  const profile = useSelector((state) => state.userSlice.profile);
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All status</option>
            <option>Paid</option>
            <option>Canceled</option>
            <option>Waiting for processing</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>The last 3 months</option>
            <option>The most recent 6 months</option>
            <option>1 most recent year</option>
          </select>
          <div className="ml-auto text-sm text-gray-600">
            Total: {profile.thongTinDatVe.length > 1 ? `${profile.thongTinDatVe.length} tickets` : `${profile.thongTinDatVe.length} ticket`} 
          </div>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {profile?.thongTinDatVe?.map((ticket) => {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <img
                    src={ticket.hinhAnh}
                    alt={ticket.tenPhim}
                    className="w-20 h-28 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {ticket.tenPhim}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {ticket.danhSachGhe[0].tenHeThongRap} -{" "}
                        {ticket.danhSachGhe[0].tenRap}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(ticket.ngayDat, "EEEE - dd/MM/yyyy")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {ticket.thoiLuongPhim} minutes
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        <span className="mr-1">Seat:</span>
                        <span>
                          {ticket.danhSachGhe
                            .map((seat) => seat.tenGhe)
                            .join(" - ")}{" "}
                          ( {ticket.danhSachGhe.length == 1 ? `${ticket.danhSachGhe.length} seat` : `${ticket.danhSachGhe.length} seats`})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {(ticket.giaVe * ticket.danhSachGhe.length).toLocaleString(
                      "vi-VN"
                    )}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Paid
                  </span>
                  <div className="mt-2 text-xs text-gray-500">
                    Ticket code: {ticket.maVe}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
