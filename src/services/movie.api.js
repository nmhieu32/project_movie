import api from "./api";

export const getBannerApi = async () => {
  try {
    const response = await api.get("QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getBanner ~ error:", error);
  }
};

export const getListMoviesAPI = async (maNhom, currentPage) => {
  try {
    const response = await api.get(
      `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${currentPage}&soPhanTuTrenTrang=12`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getListMovies ~ error:", error);
  }
};

export const getTheaterDetailApi = async (maNhom) => {
  try {
    const response = await api.get(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getTheaterDetail ~ error:", error);
  }
};

export const getMovieDetailsApi = async (movieId) => {
  try {
    const response = await api.get(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getMovieDetailsApi ~ error:", error);
  }
};

export const getListTicketRoomApi = async (showtimeId) => {
  try {
    const response = await api.get(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getListTicketRoomApi ~ error:", error);
  }
};
