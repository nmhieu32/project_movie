import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getListTicketRoomApi } from "../../../services/movie.api";
import Chair from "./Chair";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setListChair } from "../../../store/booking.slice";
import ListChairSelected from "./listChairSelected";

export default function BoxDetailsPage() {
  const { showtimeId } = useParams();
  const dispatch = useDispatch();
  const {
    data: listChair,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket-room", showtimeId],
    queryFn: () => getListTicketRoomApi(showtimeId),
    enabled: !!showtimeId,
  });

  useEffect(() => {
    if (listChair) {
      dispatch(setListChair(listChair));
    }
  }, [listChair, dispatch]);

  const renderListChair = () => {
    return listChair?.danhSachGhe?.map((chair) => {
      return <Chair key={chair.maGhe} chair={chair} />;
    });
  };

  return (
    <div className="flex list-chair">
      <div className="container mx-auto w-3/4">
        <div>
          <h1 className="text-3xl text-yellow-500 text-center">
            ĐẶT VÉ XEM PHIM TICKET.VN
          </h1>
          <h2 className="text-center text-white text-2xl">Màn hình</h2>
          <div className="screen"></div>
          <div className="grid grid-cols-10 gap-2">{renderListChair()}</div>
        </div>
      </div>
      <div className="w-1/4">
        <ListChairSelected />
      </div>
    </div>
  );
}
