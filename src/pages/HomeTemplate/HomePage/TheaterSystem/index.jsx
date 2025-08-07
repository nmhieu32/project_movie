import { useQuery } from "@tanstack/react-query";
import { getTheaterSystemApi } from "./../../../../services/movie.api";
import { useState } from "react";

export default function TheaterSystem() {
  const [activeLogo, setActiveLogo] = useState("");

  const {
    data: theater,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["theater-system"],
    queryFn: () => getTheaterSystemApi(),
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold mx-4 my-10">
        Theater System
      </h1>

      <div className="relative overflow-x-auto">
        <table className="w-3/4 mx-auto text-sm text-left rtl:text-right shadow-md">
          <thead className="md:text-md lg:text-lg sm:text-sm text-white uppercase bg-orange-600 dark:bg-orange-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 w-[150px]">
                System
              </th>
              <th scope="col" className="px-6 py-3">
                Theater Complex
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {theater?.map((item) => (
              <tr
                key={item.maHeThongRap}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className={`px-6 py-4 font-medium text-gray-900 dark:text-white border-r hover:border-orange-600 ${
                    activeLogo === item.maHeThongRap
                      ? "border-orange-600"
                      : "border-gray-300 "
                  }`}
                >
                  <img
                    className="size-20 cursor-pointer"
                    src={item.logo}
                    alt={item.biDanh}
                    onClick={() => setActiveLogo(item.maHeThongRap)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
