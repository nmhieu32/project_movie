import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { registerApi } from "../../../services/auth.api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

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
  soDt: z
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
});

export default function RegisterPage() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      taiKhoan: "",
      matKhau: "",
    },
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate()

  const { mutate: fetchRegisterApi } = useMutation({
    mutationFn: (values) => registerApi(values),
    onSuccess: (data) => {
      if (data) {
        alert("Registration successful!");
        navigate("/login");
      }
    },
    onError: () => {
      alert("Registration failed. Please try again.");
    },
  });

  const errors = formState.errors;

  const onSubmit = (values) => {
    fetchRegisterApi(values);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.maLoaiNguoiDung === "QuanTri") {
    return <Navigate to="/admin" />;
  }
  if (user && user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-30 bg-[url(/images/backgroundListMovie.jpg)] bg-cover bg-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="Enter your full name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("hoTen")}
            />
            {errors?.hoTen?.message && (
              <span className="font-medium text-sm text-red-800">
                {errors.hoTen.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("email")}
            />
            {errors?.email?.message && (
              <span className="font-medium text-sm text-red-800">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("soDt")}
            />
            {errors?.soDt?.message && (
              <span className="font-medium text-sm text-red-800">
                {errors.soDt.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter a username..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("taiKhoan")}
            />
            {errors?.taiKhoan?.message && (
              <span className="font-medium text-sm text-red-800">
                {errors.taiKhoan.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("matKhau")}
            />
            {errors?.matKhau?.message && (
              <span className="font-medium text-sm text-red-800">
                {errors.matKhau.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?
          <NavLink to="/login" className="text-orange-500 hover:underline">
            Login here
          </NavLink>
        </p>
      </div>
    </div>
  );
}
