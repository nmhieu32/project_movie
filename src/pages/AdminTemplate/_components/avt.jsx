import React from "react";
import avt from "../../../assets/nobitaAVt.jpg";
export default function Avt() {
  return (
    <div className="place-content-center place-items-center mt-7 flex">
      <img src={avt} alt="" className="w-17 h-17 rounded-[50%]" />
      <article className="ml-3 text-md overflow-hidden">
        <h1>HDUY@gmail.com</h1>
        <span className="text-sm">Quản trị</span>
      </article>
    </div>
  );
}
