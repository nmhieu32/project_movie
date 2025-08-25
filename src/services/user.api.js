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
export const getAllUser = async () => {
  try {
    const response = await api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}
export const getAllTypeUser = async () => {
  try {
    const response = await api.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}
export const addUser = async (data) => {
  try {
    const response = await api.post("QuanLyNguoiDung/ThemNguoiDung", data);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}
export const updateUser = async (data) => {
  try {
    const response = await api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}
export const deleteUser = async (TaiKhoan) => {
  try {
    const response = await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}
export const SearchUser = async (keyValue) => {
  try {
    const response = await api.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyValue}`);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ updateInfoPersonalApi ~ error:", error);
  }
}