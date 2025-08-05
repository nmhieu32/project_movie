import api from "./api";

export const getBannerApi = async () => {
  try {
    const response = await api.get("QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getBanner ~ error:", error);
  }
};

export const getListMoviesAPI = async (maNhom) => {
  try {
    const response = await api.get(
      `QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getListMovies ~ error:", error);
  }
};
