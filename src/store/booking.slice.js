import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listChair: [],
  billTicket: [],
  totalMoney: 0,
};

const bookingTiketSlice = createSlice({
  name: "bookingTiketSlice",
  initialState,
  reducers: {
    setListChair: (state, action) => {
      state.listChair = action.payload.danhSachGhe;
    },
    chairSelected: (state, action) => {
      const ticket = action.payload;
      state.billTicket.push(ticket);
      state.totalMoney += ticket.giaVe;
    },
    chairUnselected: (state, action) => {
      const billNow = [...state.billTicket];
      const newBill = billNow.filter(
        (item) => item.tenGhe !== action.payload.tenGhe
      );
      state.billTicket = newBill;
      state.totalMoney -= action.payload.giaVe;
    },
    onDelete: (state) => {
      state.billTicket = [];
      state.totalMoney = 0;
    },
  },
});

export const {
  chairSelected,
  chairUnselected,
  onSubmitTicket,
  setListChair,
  onDelete,
} = bookingTiketSlice.actions;

export const bookingTiketReducer = bookingTiketSlice.reducer;
