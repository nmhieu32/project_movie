import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { putMovie } from "../../../services/movie.api";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";

// ✅ Schema validate
const movieSchema = z.object({
  tenPhim: z.string().min(1, "Tên phim không được để trống"),
  trailer: z.string().url("Trailer phải là URL hợp lệ").optional().or(z.literal("")),
  moTa: z.string().optional(),
  maNhom: z.string().min(1, "Mã nhóm không được để trống"),
  ngayKhoiChieu: z.string().min(1, "Ngày khởi chiếu không được để trống"),
  status: z.enum(["dangChieu", "sapChieu"]),
  hot: z.boolean(),
  danhGia: z.number().min(0).max(10).optional(),
});

export default function EditMovieModal({ movie, onClose, onUpdate }) {
  const [preview, setPreview] = useState(movie.hinhAnh || null);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      maPhim: movie.maPhim,
      tenPhim: movie.tenPhim,
      trailer: movie.trailer || "",
      moTa: movie.moTa || "",
      maNhom: movie.maNhom || "GP01",
      ngayKhoiChieu: movie.ngayKhoiChieu?.slice(0, 10) || "",
      status: movie.dangChieu ? "dangChieu" : movie.sapChieu ? "sapChieu" : "dangChieu",
      hot: movie.hot || false,
      danhGia: movie.danhGia || 0,
    },
  });

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: putMovie,
  });

  // ✅ Submit form
const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    formData.append("maPhim", movie.maPhim);
    formData.append("tenPhim", data.tenPhim);
    formData.append("trailer", data.trailer || "");
    formData.append("moTa", data.moTa || "");
    formData.append("maNhom", data.maNhom || "GP01");

    const formattedDate = format(new Date(data.ngayKhoiChieu), "dd/MM/yyyy");
    formData.append("ngayKhoiChieu", formattedDate);

    // Boolean fields
    formData.append("sapChieu", data.status === "sapChieu");
    formData.append("dangChieu", data.status === "dangChieu");
    formData.append("hot", data.hot);

    formData.append("danhGia", data.danhGia || 0);

    // File (giữ ảnh cũ nếu không chọn mới)
    if (file) {
      formData.append("hinhAnh", file, file.name);
    } else {
      formData.append("hinhAnh", movie.hinhAnh);
    }

    // Debug check
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const result = await mutation.mutateAsync(formData);

    toast.success("Cập nhật phim thành công!");
    onUpdate(result);
    onClose();
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Cập nhật thất bại! " + (error.response?.data?.content || error.message));
  }
};


  // ✅ Xử lý chọn file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(movie.hinhAnh || null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white text-black p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Cập nhật phim</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="Tên phim"
                className="w-full border p-2 rounded"
                {...register("tenPhim")}
              />
              {errors.tenPhim && <p className="text-red-500">{errors.tenPhim.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Trailer URL"
                className="w-full border p-2 rounded"
                {...register("trailer")}
              />
              {errors.trailer && <p className="text-red-500">{errors.trailer.message}</p>}
            </div>
          </div>

          <textarea
            placeholder="Mô tả"
            className="w-full border p-2 rounded"
            rows={3}
            {...register("moTa")}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="Mã nhóm"
                className="w-full border p-2 rounded"
                {...register("maNhom")}
              />
              {errors.maNhom && <p className="text-red-500">{errors.maNhom.message}</p>}
            </div>
            <div>
              <input type="date" className="w-full border p-2 rounded" {...register("ngayKhoiChieu")} />
              {errors.ngayKhoiChieu && <p className="text-red-500">{errors.ngayKhoiChieu.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="dangChieu" {...register("status")} checked={watch("status") === "dangChieu"} />
                Đang chiếu
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="sapChieu" {...register("status")} checked={watch("status") === "sapChieu"} />
                Sắp chiếu
              </label>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("hot")} /> Hot
            </label>
          </div>

          <div>
            <input
              type="number"
              placeholder="Đánh giá (0-10)"
              min={0}
              max={10}
              className="w-full border p-2 rounded"
              {...register("danhGia", { valueAsNumber: true })}
            />
            {errors.danhGia && <p className="text-red-500">{errors.danhGia.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Hình ảnh</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
            <p className="text-sm text-gray-500 mt-1">
              {file ? "File mới đã được chọn" : "Sẽ giữ ảnh cũ nếu không chọn file mới"}
            </p>
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 w-60 h-60 object-cover rounded" />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Đang cập nhật..." : "Cập nhật phim"}
          </button>
        </form>
      </div>
    </div>
  );
}
