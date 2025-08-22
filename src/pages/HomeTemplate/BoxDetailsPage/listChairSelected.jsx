import { useDispatch, useSelector } from "react-redux";
import { chairUnselected, onDelete } from "../../../store/booking.slice";
import {
  Calendar,
  Clock,
  CreditCard,
  Film,
  Globe,
  MapPin,
  Trash2,
  X,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "../../../services/ticket.api";

export default function ListChairSelected(props) {
  const { listChair, refetch } = props;
  const dispatch = useDispatch();
  const { billTicket, totalMoney } = useSelector(
    (state) => state.bookingTiketReducer
  );

  const { mutate } = useMutation({
    mutationFn: (ticket) => bookingApi(ticket),
    onSuccess: (data) => {
      alert(data);
      dispatch(onDelete());
      refetch();
    },
    onError: (error) => {
      console.log("🍃 ~ ListChairSelected ~ error:", error);
    },
  });

  const changeMoneyVND = (money) => {
    return money?.toLocaleString("vi-VN");
  };
  if (!listChair) return;
  const movieInfo = listChair.thongTinPhim;

  const handleOnDelete = () => {
    dispatch(onDelete());
  };

  const handleOnSubmit = () => {
    const ticket = {
      maLichChieu: movieInfo.maLichChieu,
      danhSachVe: billTicket.map((ticket) => ({
        maGhe: ticket.maGhe,
        giaVe: ticket.giaVe,
      })),
    };
    mutate(ticket);
  };
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
          <h2 className="text-xl font-bold text-yellow-400 flex items-center">
            <Film className="w-6 h-6 mr-3" />
            Movie Information
          </h2>
        </div>

        <div className="p-6">
          {/* Movie Poster */}
          <div className="relative mb-6">
            <img
              src={movieInfo.hinhAnh}
              alt={movieInfo.tenPhim}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              T13
            </div>
          </div>

          {/* Movie Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              {movieInfo.tenPhim}
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                <span>128 minutes</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                <span>
                  {movieInfo.ngayChieu} - {movieInfo.gioChieu}
                </span>
              </div>

              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                <div>
                  <p>{movieInfo.tenCumRap}</p>
                  <p className="text-xs text-gray-400">{movieInfo.diaChi}</p>
                  <p className="text-xs text-gray-400">{movieInfo.tenRap}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <Globe className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-xs">English</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Tickets */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
          <h2 className="text-xl font-bold text-yellow-400 flex items-center">
            <CreditCard className="w-6 h-6 mr-3" />
            Seat Selected ({billTicket.length})
          </h2>
        </div>

        <div className="p-6">
          {billTicket.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">No seats have been selected yet</p>
              <p className="text-gray-500 text-sm">
                Click on the chair to select
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {billTicket.map((ticket) => (
                <div
                  key={ticket.tenGhe}
                  className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg group hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded text-sm">
                      {ticket.tenGhe}
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Seat {ticket.tenGhe}
                      </p>
                      <p className="text-yellow-400 text-sm">
                        {changeMoneyVND(ticket.giaVe)}đ
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(chairUnselected(ticket))}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Total & Checkout */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-white font-bold text-lg">Total:</span>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {changeMoneyVND(totalMoney)}
            </div>
            <div className="text-yellow-400 text-sm">VND</div>
          </div>
        </div>

        <div className="space-y-3">
          {billTicket.length > 0 && (
            <button
              onClick={handleOnDelete}
              className="w-full px-4 py-2 bg-gray-600/20 hover:bg-red-500/20 border border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete All</span>
            </button>
          )}

          <button
            onClick={handleOnSubmit}
            disabled={billTicket.length === 0}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
              billTicket.length === 0
                ? "bg-gray-600/50 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
            }`}
          >
            {billTicket.length === 0
              ? "Select a seat to book a ticket"
              : `Book Tickets - ${changeMoneyVND(totalMoney)}đ`}
          </button>
        </div>
      </div>

      {billTicket.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
            <div className="text-yellow-400 font-bold text-xl">
              {billTicket.length}
            </div>
            <div className="text-gray-400 text-xs">Seat selected</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
            <div className="text-yellow-400 font-bold text-xl">
              {Math.round(totalMoney / billTicket.length / 1000)}K
            </div>
            <div className="text-gray-400 text-xs">Average price</div>
          </div>
        </div>
      )}
    </div>
  );
}
