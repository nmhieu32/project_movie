import api from "./api";

export const getInfoPersonalApi = async () => {
  try {
    const response = await api.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ getInfoPersonalApi ~ error:", error);
  }
};

export const updateInfoPersonalApi = async (data) => {
  try {
    const response = await api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}