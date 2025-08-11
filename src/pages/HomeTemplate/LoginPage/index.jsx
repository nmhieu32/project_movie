import { NavLink } from "react-router-dom";


export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 bg-[url(/images/backgroundListMovie.jpg)] bg-cover bg-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {/* Form */}
        <form 
        // onSubmit={handleSubmit} 
        className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User name
            </label>
            <input
              type="username"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        {/* Đăng ký */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account yet ?{" "}
          <NavLink to="/register" className="text-orange-500 hover:underline">
            Register now
          </NavLink>
        </p>
      </div>
    </div>
  )
}
