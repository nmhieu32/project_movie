import React, { useState, useRef } from "react";

export default function SliderDelete({ onConfirm }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0); // vị trí nút đen
  const trackRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    let newPos = e.clientX - trackRect.left - 10; // 10 = half của thumb (20px)
    if (newPos < 0) newPos = 0;
    if (newPos > trackRect.width - 20) newPos = trackRect.width - 20; // thumb size = 20px
    setPosition(newPos);
  };

  const handleMouseUp = () => {
    if (!isDragging || !trackRef.current) return;

    setIsDragging(false);
    const trackWidth = trackRef.current.offsetWidth;

    // Nếu kéo >70% thì xác nhận xóa
    if (position > trackWidth * 0.7) {
      onConfirm(); // gọi hàm mở modal từ ngoài
      setPosition(0); // reset về trái sau khi xử lý
    } else {
      setPosition(0); // chưa đủ thì reset về trái
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-20 h-6 bg-gray-300 rounded-full cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{ left: position }}
        className="absolute top-1 w-4 h-4 bg-black rounded-full transition-all"
      ></div>
    </div>
  );
}
