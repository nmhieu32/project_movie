import { useQuery } from "@tanstack/react-query";
import { getBannerApi } from "../../../../services/movie.api";
import SkeletonBanner from "../../_components/Skeleton/carousel.theater";

export default function Carousel() {
  const {
    data: banner,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banner"],
    queryFn: () => getBannerApi(),
  });

  if (isLoading)
    return (
      <SkeletonBanner/>
    );

  return (
    <div className="w-full flex justify-center">
      {/* Carousel wrapper */}
      {banner.map((item) => {
        if (item.maBanner === 1)
          return (
            <img
              key={item.maBanner}
              src={item.hinhAnh}
              className="w-full h-auto object-cover"
              alt=""
            />
          );
      })}
    </div>
  );
}
