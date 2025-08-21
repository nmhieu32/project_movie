import { useDispatch, useSelector } from "react-redux";
import { chairSelected, chairUnselected } from "../../../store/booking.slice";

export default function Chair() {
  const dispatch = useDispatch();

  const listChair = useSelector((state) => state.bookingTiketReducer.listChair);

  const billTicket = useSelector(
    (state) => state.bookingTiketReducer.billTicket
  );

  const isChecked = (tenGhe) => {
    // some: true=nếu ít nhất 1 phần tử thoả
    return billTicket.some((item) => item.tenGhe === tenGhe);
  };
  if (!listChair) return;

  const chair = listChair;

  const renderNumberChair = () => {
    return chair.map((seat) => {
      return (
        <button
          key={seat.maGhe}
          onClick={() => toggleSeat(seat)}
          disabled={seat.daDat}
          className={`w-8 h-8 rounded text-xs font-bold transition-all duration-200 hover:scale-105 ${getSeatStyle(
            seat
          )}`}
          title={`Seat ${seat.tenGhe} - ${getLoaiGheDisplay(
            seat.loaiGhe
          )} - ${changeMoneyVND(seat.giaVe)}đ`}
        >
          {seat.tenGhe}
        </button>
      );
    });
  };

  const getSeatStyle = (seat) => {
    if (seat.daDat) return "bg-red-500 cursor-not-allowed text-white";
    if (isChecked(seat.tenGhe))
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg";

    switch (seat.loaiGhe) {
      case "Vip":
        return "bg-yellow-300 hover:bg-yellow-400 text-black";
      default:
        return "bg-gray-400 hover:bg-gray-500 text-black";
    }
  };

  const getLoaiGheDisplay = (loaiGhe) => {
    switch (loaiGhe) {
      case "Thuong":
        return "Thường";
      case "Vip":
        return "VIP";
      default:
        return loaiGhe;
    }
  };

  const changeMoneyVND = (money) => {
    return money.toLocaleString("vi-VN");
  };

  const toggleSeat = (seat) => {
    if (seat.daDat) return; // Không thể chọn ghế đã đặt

    if (isChecked(seat.tenGhe)) {
      dispatch(chairUnselected(seat));
    } else {
      dispatch(chairSelected(seat));
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          SEAT MAP
        </h2>

        {/* Screen */}
        <div className="mb-8">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full mx-auto mb-3"
            style={{ width: "80%" }}
          ></div>
          <p className="text-center text-gray-300 font-semibold">SCEEN</p>
        </div>

        {/* Seat Legend */}
        <div className="flex justify-center gap-6 mb-8 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <span className="text-gray-300">Regular (75K)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-300 rounded"></div>
            <span className="text-gray-300">VIP (90K)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="text-gray-300">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <span className="text-gray-300">Selected</span>
          </div>
        </div>

        {/* Cinema Seats */}
        <div className="space-y-3">
          <div className="grid grid-cols-16 gap-4">{renderNumberChair()}</div>
        </div>
      </div>
    </div>
  );
}
