export const getHeThongRap = async () => {
  try {
    const response = await api.get("QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getBanner ~ error:", error);
  }
};