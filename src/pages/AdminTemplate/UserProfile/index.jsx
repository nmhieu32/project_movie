import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { updateInfoPersonalApi } from "../../../services/user.api";
import { setProfile } from "../../../store/user.slice";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

// ✅ Schema validate với zod
const schema = z.object({
  hoTen: z.string().nonempty("Họ tên bắt buộc.").min(2, "Ít nhất 2 ký tự."),
  email: z.string().email("Email không hợp lệ."),
  soDT: z
    .string()
    .regex(/^[0-9]+$/, "Chỉ nhập số điện thoại.")
    .nonempty("Số điện thoại bắt buộc."),
  matKhau: z
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự.")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/,
      "Cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số & 1 ký tự đặc biệt."
    ),
  taiKhoan: z.string().nonempty("Tài khoản bắt buộc."),
  maNhom: z.string().nonempty("Mã nhóm bắt buộc."),
  maLoaiNguoiDung: z.string().nonempty("Mã loại người dùng bắt buộc."),
});

export default function UserProfile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userSlice);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ lấy user từ localStorage nếu redux rỗng
  useEffect(() => {
    if (!profile) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setProfile(JSON.parse(storedUser)));
      }
    }
  }, [profile, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
    resolver: zodResolver(schema),
  });

  // ✅ reset form khi profile thay đổi
  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const { mutate: handleUpdateInfo, isPending } = useMutation({
    mutationFn: (values) => updateInfoPersonalApi(values),
    onSuccess: (data) => {
      if (!data) return;
      dispatch(setProfile(data));
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Lỗi khi cập nhật thông tin.");
    },
  });

  const onSubmit = (values) => {
    console.log("🚀 Payload gửi đi:", values); // debug
    handleUpdateInfo(values);
  };

  if (!profile) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Chưa có thông tin người dùng
      </p>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto mt-10 p-8 rounded-2xl shadow-lg border"
      style={{ background: "linear-gradient(to bottom, #1A2A80, #B2B0E8)" }}
    >
      {/* Avatar + Title */}
      <div className="flex flex-col items-center">
        <FaUserCircle className="text-white text-6xl" />
        <h2 className="text-2xl font-bold mt-3 text-white">
          Thông tin cá nhân
        </h2>
        <p className="text-gray-200">{profile.email}</p>
      </div>

      <div className="mt-6">
        {!isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="Họ tên" value={profile.hoTen} />
              <InfoItem label="Số điện thoại" value={profile.soDT} />
              <InfoItem label="Tài khoản" value={profile.taiKhoan} />
              <InfoItem label="Mã nhóm" value={profile.maNhom} />
              <InfoItem
                label="Loại người dùng"
                value={profile.maLoaiNguoiDung}
              />
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 py-2 rounded-lg text-white transition"
              style={{ backgroundColor: "#3B38A0" }}
            >
              Cập nhật thông tin
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Họ tên" error={errors.hoTen?.message}>
              <input
                type="text"
                {...register("hoTen")}
                className="w-full p-2 rounded"
                style={{ borderColor: "#7A85C1" }}
              />
            </FormField>
            <FormField label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 rounded"
                style={{ borderColor: "#7A85C1" }}
              />
            </FormField>
            <FormField label="Số ĐT" error={errors.soDT?.message}>
              <input
                type="text"
                {...register("soDT")}
                className="w-full p-2 rounded"
                style={{ borderColor: "#7A85C1" }}
              />
            </FormField>
            <FormField label="Mật khẩu" error={errors.matKhau?.message}>
              <input
                type="password"
                {...register("matKhau")}
                className="w-full p-2 rounded"
                style={{ borderColor: "#7A85C1" }}
              />
            </FormField>
            <FormField label="Mã nhóm" error={errors.maNhom?.message}>
              <input
                type="text"
                {...register("maNhom")}
                className="w-full p-2 rounded"
                style={{ borderColor: "#7A85C1" }}
              />
            </FormField>
            <FormField label="Loại người dùng">
              <input
                type="text"
                disabled
                {...register("maLoaiNguoiDung")}
                className="w-full p-2 rounded text-gray-200"
                style={{ backgroundColor: "#B2B0E8", borderColor: "#7A85C1" }}
              />
            </FormField>
            <FormField label="Tài khoản">
              <input
                type="text"
                {...register("taiKhoan")}
                disabled
                className="w-full p-2 rounded text-gray-200"
                style={{ backgroundColor: "#B2B0E8", borderColor: "#7A85C1" }}
              />
            </FormField>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 py-2 rounded-lg text-white transition"
                style={{ backgroundColor: "#3B38A0" }}
              >
                {isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 rounded-lg text-white transition"
                style={{ backgroundColor: "#7A85C1" }}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Component nhỏ để hiển thị thông tin dạng card row
function InfoItem({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

// Component nhỏ cho form field
function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      {children}
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
