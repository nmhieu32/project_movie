import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUser,
  addUser,
  updateInfoPersonalApi,
  deleteUser,
  SearchUser,
} from "../../../services/user.api";
import { MoreVertical } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ schema validate với zod - sửa soDt thành soDT
const userSchema = z.object({
  taiKhoan: z.string().min(3, "Tài khoản tối thiểu 3 ký tự"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  soDT: z.string().min(8, "Số điện thoại không hợp lệ"), // ✅ sửa soDT
  maNhom: z.string().min(1, "Mã nhóm bắt buộc"),
  maLoaiNguoiDung: z.enum(["QuanTri", "KhachHang"]),
  hoTen: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
});

export default function UserManager() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmUser, setConfirmUser] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  // search state
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users mặc định
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  // Mutation search user
  const searchMutation = useMutation({
    mutationFn: SearchUser,
  });

  // chọn danh sách hiển thị
  const displayUsers =
    searchTerm && searchMutation.data ? searchMutation.data : users;

  // Mutation add
  const addMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("Thêm user thành công!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => toast.error("Thêm user thất bại!"),
  });

  // Mutation update
  const updateMutation = useMutation({
    mutationFn: updateInfoPersonalApi,
    onSuccess: () => {
      toast.success("Cập nhật user thành công!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => toast.error("Cập nhật user thất bại!"),
  });

  // Mutation delete
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Xóa user thành công!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => toast.error("Xóa user thất bại!"),
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const totalPages = Math.ceil(displayUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = displayUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, 5, "...", totalPages);
      else if (currentPage >= totalPages - 2)
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      else
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
    }
    return pages;
  };

  if (isLoading) return <p className="p-6">Đang tải dữ liệu...</p>;
  if (isError) return <p className="p-6 text-red-600">Lỗi khi tải dữ liệu!</p>;

  return (
    <div className="p-6 bg-[#252746] h-200 opacity-95">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-bold">Quản lý User</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            className="border p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              if (searchTerm.trim() !== "") {
                searchMutation.mutate(searchTerm);
              }
            }}
          >
            Tìm
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setIsAdd(true)}
          >
            + Thêm người dùng
          </button>
        </div>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-700  text-white text-left">
            <th className="p-3">STT</th>
            <th className="p-3">Tài khoản</th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">Số ĐT</th>
            <th className="p-3">Loại người dùng</th>
            <th className="p-3 text-center">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr
              key={user.taiKhoan}
              className="border-b border-gray-700 bg-[#262741] hover:bg-[#1F2035] text-gray-200"
            >
              <td className="p-3">{startIndex + index + 1}</td>
              <td className="p-3 font-medium">{user.taiKhoan}</td>
              <td className="p-3">{user.hoTen}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.soDT}</td>
              <td className="p-3 text-center">
                <span
                  className={`px-2 py-1 rounded-lg text-xs ${
                    user.maLoaiNguoiDung === "QuanTri"
                      ? "bg-blue-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {user.maLoaiNguoiDung === "QuanTri"
                    ? "Quản trị"
                    : "Khách hàng"}
                </span>
              </td>
              <td className="p-3 text-center relative">
                <ActionMenu
                  onEdit={() => setSelectedUser(user)}
                  onDelete={() => setConfirmUser(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 text-white py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-600 text-white" : ""
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal Add */}
      {isAdd && (
        <UserForm
          title="Thêm người dùng"
          onClose={() => setIsAdd(false)}
          onSubmit={(data) => addMutation.mutate(data)}
        />
      )}

      {/* Modal Edit */}
      {selectedUser && (
        <UserForm
          title="Chỉnh sửa người dùng"
          initialData={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={(data) => updateMutation.mutate(data)}
        />
      )}

      {/* Modal xác nhận xóa */}
      {confirmUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">
              Bạn có chắc muốn xóa user <b>{confirmUser.hoTen}</b>?
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-400 rounded text-white"
                onClick={() => setConfirmUser(null)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded text-white"
                onClick={() => {
                  deleteMutation.mutate(confirmUser.taiKhoan);
                  setConfirmUser(null);
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component 3 dấu chấm
function ActionMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <MoreVertical size={18} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
          <button
            className="block text-black w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// Form Add/Edit user
function UserForm({ title, initialData = {}, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      taiKhoan: initialData.taiKhoan || "",
      matKhau: initialData.matKhau || "123456789aA@",
      email: initialData.email || "",
      soDT: initialData.soDT || "", // ✅ đổi sang soDT
      maNhom: initialData.maNhom || "GP01",
      maLoaiNguoiDung: initialData.maLoaiNguoiDung || "KhachHang",
      hoTen: initialData.hoTen || "",
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <form
          onSubmit={handleSubmit((data) => {
            console.log("📦 Submit:", data);
            onSubmit(data); // gửi đúng soDT
          })}
          className="space-y-3"
        >
          <input
            className="w-full border p-2 rounded"
            placeholder="Tài khoản"
            {...register("taiKhoan")}
          />
          {errors.taiKhoan && (
            <p className="text-red-600 text-sm">{errors.taiKhoan.message}</p>
          )}
          <input
            className="w-full border p-2 rounded"
            placeholder="Mật khẩu"
            type="password"
            {...register("matKhau")}
          />
          {errors.matKhau && (
            <p className="text-red-600 text-sm">{errors.matKhau.message}</p>
          )}
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
          <input
            className="w-full border p-2 rounded"
            placeholder="Số điện thoại"
            {...register("soDT")} // ✅ đổi sang soDT
          />
          {errors.soDT && (
            <p className="text-red-600 text-sm">{errors.soDT.message}</p>
          )}
          <input
            className="w-full border p-2 rounded"
            placeholder="Mã nhóm"
            {...register("maNhom")}
          />
          {errors.maNhom && (
            <p className="text-red-600 text-sm">{errors.maNhom.message}</p>
          )}
          <select
            className="w-full border p-2 rounded"
            {...register("maLoaiNguoiDung")}
          >
            <option value="QuanTri">Quản trị</option>
            <option value="KhachHang">Khách hàng</option>
          </select>
          <input
            className="w-full border p-2 rounded"
            placeholder="Họ tên"
            {...register("hoTen")}
          />
          {errors.hoTen && (
            <p className="text-red-600 text-sm">{errors.hoTen.message}</p>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
