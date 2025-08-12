import api from "./api";

export const loginApi = async (values) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
    return response.data.content;
  } catch (error) {
    return alert(error.response.data.content);
  }
};

export const registerApi = async (values) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangKy", values);
    return response.data.content;
  } catch (error) {
    return alert(error.response.data.content);
  }
};
