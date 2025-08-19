import { useDispatch, useSelector } from "react-redux";
import { chairSelected, chairUnselected } from "../../../store/booking.slice";

export default function Chair(props) {
  const dispatch = useDispatch();

  const { chair } = props;

  const billTicket = useSelector(
    (state) => state.bookingTiketReducer.billTicket
  );

  const isChecked = (tenGhe) => {
    // some: true=nếu ít nhất 1 phần tử thoả
    return billTicket.some((item) => item.tenGhe === tenGhe);
  };

  const renderNumberChair = () => {
    return (
      <div key={chair.tenGhe}>
        <input
          disabled={chair.daDat}
          checked={isChecked(chair.tenGhe)}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(chairSelected(chair));
            } else {
              dispatch(chairUnselected(chair));
            }
          }}
          type="checkbox"
          className={`ghe ${
            chair.daDat ? "bg-orange-500 cursor-not-allowed" : ""
          }`}
          value={chair.tenGhe}
          name={chair.tenGhe}
        />
      </div>
    );
  };

  return <>{renderNumberChair()}</>;
}
