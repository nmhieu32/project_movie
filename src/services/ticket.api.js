import api from "./api";

export const bookingApi = async (ticket) => {
  try {
    const response = await api.post("/QuanLyDatVe/DatVe", ticket);
    return response.data.content;
  } catch (error) {
    console.log("🍃 ~ bookingApi ~ error:", error);
  }
};
