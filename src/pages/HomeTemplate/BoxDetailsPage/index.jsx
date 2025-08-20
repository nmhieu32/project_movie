import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getListTicketRoomApi } from "../../../services/movie.api";
import Chair from "./Chair";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onDelete, setListChair } from "../../../store/booking.slice";
import ListChairSelected from "./listChairSelected";
import SkeletonBooking from "../_components/Skeleton/booking.skeleton";

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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (listChair) {
      dispatch(onDelete());
      dispatch(setListChair(listChair));
    }
  }, [listChair, dispatch, showtimeId]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to={"/login"} />;

  if (isLoading) {
    return <SkeletonBooking />;
  }

  return (
    <div className="list-chair min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
            BOOK MOVIE TICKETS
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Cinema Seats */}
          <Chair />

          {/* Right Side - Movie Info & Tickets */}
          <ListChairSelected listChair={listChair} showtimeId={showtimeId} />
        </div>
      </div>
    </div>
  );
}
