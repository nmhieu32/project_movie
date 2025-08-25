import React, { useState } from "react";
import { X } from "lucide-react";
import { postMovie } from "../../../services/movie.api";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Schema validation với Zod
const movieSchema = z.object({
  tenPhim: z.string().min(1, "Tên phim không được bỏ trống"),
  trailer: z.string().url("Trailer phải là URL hợp lệ"),
  moTa: z.string().min(1, "Mô tả không được bỏ trống"),
  maNhom: z.string().min(1, "Mã nhóm là bắt buộc"),
  ngayKhoiChieu: z.string().min(1, "Ngày khởi chiếu là bắt buộc"),
  danhGia: z
    .number({ invalid_type_error: "Đánh giá phải là số" })
    .min(0, "Tối thiểu 0")
    .max(10, "Tối đa 10"),
  hinhAnh: z.any().refine((file) => file instanceof File, "Vui lòng chọn hình ảnh"),
  status: z.enum(["dangChieu", "sapChieu"]),
  hot: z.boolean(),
});

export default function AddMovieForm({ onClose, onAdd }) {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      status: "dangChieu",
      hot: false,
      danhGia: 0,
      hinhAnh: null,
    },
  });

  // ✅ Mutation call API
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => await postMovie(formData),
    onSuccess: (data) => {
      onAdd?.(data);
      onClose?.();
      toast.success("Thêm phim thành công!");
    },
    onError: (err) => {
      console.error("Add movie failed:", err);
      toast.error("Thêm phim thất bại. Vui lòng thử lại!");
    },
  });

  // ✅ Handle submit form
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("tenPhim", data.tenPhim);
    formData.append("trailer", data.trailer);
    formData.append("moTa", data.moTa);
    formData.append("maNhom", "GP01");

    if (data.ngayKhoiChieu) {
      const [year, month, day] = data.ngayKhoiChieu.split("-");
      formData.append("ngayKhoiChieu", `${day}/${month}/${year}`);
    }

    formData.append("dangChieu", (data.status === "dangChieu").toString());
    formData.append("sapChieu", (data.status === "sapChieu").toString());
    formData.append("hot", data.hot.toString());
    formData.append("danhGia", data.danhGia.toString());

    if (data.hinhAnh instanceof File) {
      formData.append("hinhAnh", data.hinhAnh, data.hinhAnh.name);
    }

    mutate(formData);
  };

  // ✅ Handle file preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("hinhAnh", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
        <div className="bg-white text-black p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto relative">
          <button className="absolute top-2 right-2" onClick={onClose}>
            <X />
          </button>
          <h2 className="text-xl font-bold mb-4">Thêm phim</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Tên phim + Trailer */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Tên phim"
                  className="w-full border p-2 rounded"
                  {...register("tenPhim")}
                />
                {errors.tenPhim && (
                  <p className="text-red-500 text-sm">{errors.tenPhim.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Trailer URL"
                  className="w-full border p-2 rounded"
                  {...register("trailer")}
                />
                {errors.trailer && (
                  <p className="text-red-500 text-sm">{errors.trailer.message}</p>
                )}
              </div>
            </div>

            {/* Mô tả */}
            <div>
              <textarea
                placeholder="Mô tả"
                className="w-full border p-2 rounded"
                rows={3}
                {...register("moTa")}
              />
              {errors.moTa && (
                <p className="text-red-500 text-sm">{errors.moTa.message}</p>
              )}
            </div>

            {/* Mã nhóm + Ngày khởi chiếu */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Mã nhóm"
                  className="w-full border p-2 rounded"
                  {...register("maNhom")}
                />
                {errors.maNhom && (
                  <p className="text-red-500 text-sm">{errors.maNhom.message}</p>
                )}
              </div>

              <div>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  {...register("ngayKhoiChieu")}
                />
                {errors.ngayKhoiChieu && (
                  <p className="text-red-500 text-sm">{errors.ngayKhoiChieu.message}</p>
                )}
              </div>
            </div>

            {/* Trạng thái chiếu + Hot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="dangChieu"
                    {...register("status")}
                    checked={watch("status") === "dangChieu"}
                  />
                  Đang chiếu
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="sapChieu"
                    {...register("status")}
                    checked={watch("status") === "sapChieu"}
                  />
                  Sắp chiếu
                </label>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("hot")} />
                Hot
              </label>
            </div>

            {/* Đánh giá */}
            <div>
              <input
                type="number"
                placeholder="Đánh giá (0-10)"
                min={0}
                max={10}
                className="w-full border p-2 rounded"
                {...register("danhGia", { valueAsNumber: true })}
              />
              {errors.danhGia && (
                <p className="text-red-500 text-sm">{errors.danhGia.message}</p>
              )}
            </div>

            {/* Hình ảnh */}
            <div>
              <label className="block mb-1">Hình ảnh</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              {errors.hinhAnh && (
                <p className="text-red-500 text-sm">{errors.hinhAnh.message}</p>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-60 h-60 object-fill rounded"
                />
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
            >
              {isPending ? "Đang thêm..." : "Thêm phim"}
            </button>
          </form>
        </div>
      </div>

      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
