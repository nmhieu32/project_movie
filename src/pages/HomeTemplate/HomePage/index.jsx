import { Navigate } from "react-router-dom";
import Carousel from "./Carousel";
import ListMovie from "./ListMovie";
import TheaterSystem from "./TheaterSystem";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <div className="bg-[url(/images/backgroundListMovie.jpg)] bg-cover bg-center bg-gray-800 bg-blend-multiply">
        <ListMovie />
        <TheaterSystem />
      </div>
    </div>
  );
}
