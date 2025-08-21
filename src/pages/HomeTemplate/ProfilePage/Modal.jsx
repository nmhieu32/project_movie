import { useDispatch, useSelector } from "react-redux";
import { setIsEditModalOpen, setProfile } from "../../../store/user.slice";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateInfoPersonalApi } from "../../../services/user.api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  hoTen: z
    .string()
    .nonempty("Full name is required.")
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name must be less than 50 characters."),
  email: z
    .string()
    .nonempty("Email is required.")
    .regex(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address."
    ),
  soDT: z
    .string()
    .nonempty("Phone number is required.")
    .regex(/^[0-9]+$/, "Please enter a valid phone number."),
  taiKhoan: z.string().nonempty("Username is required."),
  matKhau: z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
  maNhom: z.string().nonempty("Group code is required."),
  maLoaiNguoiDung: z.string().nonempty("User type code is required."),
});

export default function Modal() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userSlice);

  const { mutate: handleUpdateInfo } = useMutation({
    mutationFn: (profile) => updateInfoPersonalApi(profile),
    onSuccess: (data) => {
      if (data) {
        dispatch(setIsEditModalOpen(false));
        dispatch(setProfile(data));
      }
    },
    onError: () => {
      console.error("Lỗi khi cập nhật thông tin cá nhân");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: profile?.hoTen || "",
      email: profile?.email || "",
      soDT: profile?.soDT || "",
      matKhau: profile?.matKhau || "",
      maNhom: profile?.maNhom || "",
      maLoaiNguoiDung: profile?.maLoaiNguoiDung || "",
      taiKhoan: profile?.taiKhoan || "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (values) => {
    handleUpdateInfo(values);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/90 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Information
          </h3>
          <button
            onClick={() => dispatch(setIsEditModalOpen(false))}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name *
              </label>
              <input
                type="text"
                name="hoTen"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("hoTen")}
              />
              {errors?.hoTen?.message && (
                <span className="font-medium text-sm text-red-800">
                  {errors.hoTen.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                name="taiKhoan"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("taiKhoan")}
              />
              {errors?.taiKhoan?.message && (
                <span className="font-medium text-sm text-red-800">
                  {errors.taiKhoan.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="text"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("soDT")}
              />
              {errors?.soDT?.message && (
                <span className="font-medium text-sm text-red-800">
                  {errors.soDT.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="text"
                name="matKhau"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("matKhau")}
              />
              {errors?.matKhau?.message && (
                <span className="font-medium text-sm text-red-800">
                  {errors.matKhau.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Code *
              </label>
              <input
                type="text"
                name="maNhom"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("maNhom")}
              />
              {errors?.maNhom?.message && (
                <span className="font-medium text-sm text-red-800">
                  {errors.maNhom.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User type code
              </label>
              <input
                type="text"
                name="maLoaiNguoiDung"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 cursor-not-allowed"
                {...register("maLoaiNguoiDung")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="text"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("email")}
              />
              {errors?.email?.message && (
                <span className="font-medium text-sm text-red-800">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => dispatch(setIsEditModalOpen(false))}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancle
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
