import { useDispatch, useSelector } from "react-redux";
import { chairUnselected, onSubmitTicket } from "../../../store/booking.slice";


export default function ListChairSelected() {
  const billTicket = useSelector((state) => state.bookingTiketReducer.billTicket);
  const totalMoney = useSelector((state) => state.bookingTiketReducer.totalMoney);
  const dispatch = useDispatch();

  const changeMoneyVND = (money) => {
    return money?.toLocaleString("vi-VN");
  };

  return (
    <>
      <h1 className="text-2xl text-center text-white">
        DANH SÁCH GHẾ BẠN CHỌN
      </h1>
      <ul className="danhSachGhe">
        <li>
          <span className="gheDuocChon"></span>
          <span>Ghế đã đặt</span>
        </li>
        <li>
          <span className="gheDangChon"></span>
          <span>Ghế đang chọn</span>
        </li>
        <li>
          <span className="gheChuaChon"></span>
          <span>Ghế chưa đặt</span>
        </li>
      </ul>

      <div className="relative overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-xl text-center text-white border border-gray-700 border-collapse">
          <thead className="bg-gray-800 text-yellow-400 uppercase">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 border border-gray-700 rounded-s-lg"
              >
                Số ghế
              </th>
              <th scope="col" className="px-6 py-3 border border-gray-700">
                Giá
              </th>
              <th
                scope="col"
                className="px-6 py-3 border border-gray-700 rounded-e-lg"
              >
                Huỷ
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {billTicket?.map((ticket) => {
              return (
                <tr
                  key={ticket.tenGhe}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 border border-gray-700 text-yellow-300 font-medium"
                  >
                    {ticket.tenGhe}
                  </th>
                  <td className="px-6 py-4 border border-gray-700 text-yellow-300">
                    {changeMoneyVND(ticket.giaVe)} đ
                  </td>
                  <td className="px-6 py-4 border border-gray-700">
                    <button
                      onClick={() => {
                        dispatch(chairUnselected(ticket));
                      }}
                      className="text-red-500 font-bold hover:text-red-400 transition"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-800">
            <tr>
              <th
                scope="row"
                className="px-6 py-3 border border-gray-700 text-white"
              >
                Total
              </th>
              <td className="px-6 py-3 border border-gray-700 text-yellow-300">
                {changeMoneyVND(totalMoney)} VND
              </td>
              <td className="px-6 py-3 border border-gray-700"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={
          () => {dispatch(onSubmitTicket([]))}
        } className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition w-1/4">
          Đặt vé
        </button>
      </div>
    </>
  );
}
