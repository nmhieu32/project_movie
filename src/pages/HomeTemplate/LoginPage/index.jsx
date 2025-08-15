import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.slice";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  taiKhoan: z.string().nonempty("Username is required."),
  matKhau: z
    .string()
    .nonempty("Password is required.")
    .min(1, "Password must be at least 1 characters."),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (values) => loginApi(values),
    onSuccess: (user) => {
      if (!user) return;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      navigate(user.maLoaiNguoiDung === "QuanTri" ? "/admin" : "/");
    },
    onError: () => {
      alert("Login failed");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (values) => {
    handleLogin(values);

  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.maLoaiNguoiDung === "QuanTri") {
    return <Navigate to="/admin" />;
  }
  if (user && user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 bg-[url(/images/backgroundListMovie.jpg)] bg-cover bg-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User name
            </label>
            <input
              name="taiKhoan"
              placeholder="Enter your username..."
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
              name="matKhau"
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
            disabled={isPending}
          >
            {isPending ? <div className="loader mx-auto"></div> : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account yet ?{" "}
          <NavLink to="/register" className="text-orange-500 hover:underline">
            Register now
          </NavLink>
        </p>
      </div>
    </div>
  );
}
