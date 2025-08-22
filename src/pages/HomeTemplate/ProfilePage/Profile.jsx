import { Camera, Edit2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getInfoPersonalApi } from "../../../services/user.api";
import ProfileSkeleton from "./../_components/Skeleton/profile.skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditModalOpen, setProfile } from "../../../store/user.slice";
import { useEffect } from "react";

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userSlice.profile);

  const { mutate: handleGetInfo, isPending } = useMutation({
    mutationFn: getInfoPersonalApi,
    onSuccess: (data) => {
      if (data) {
        dispatch(setProfile(data));
      }
    },
    onError: () => {
      console.error("❌ Lỗi khi lấy thông tin cá nhân");
    },
  });

  useEffect(() => {
    handleGetInfo();
  }, [handleGetInfo]);

  const totalTicket = () => {
    const ticket = profile?.thongTinDatVe;
    let total = 0;
    for (let i = 0; i < ticket?.length; i++) {
      total++;
    }
    return total;
  };

  return (
    <>
      {isPending ? (
        <ProfileSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
                <button
                  onClick={() => dispatch(setIsEditModalOpen(true))}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-900">{profile?.hoTen}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-900">{profile?.taiKhoan}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-900">{profile?.soDT}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-900">{profile?.matKhau}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-900">{profile?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile?.loaiNguoiDung?.tenLoai}
                </div>
                <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-50">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {profile?.hoTen}
              </h3>
              <p className="text-sm text-gray-500">Member from 2023</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistical
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Total number of tickets purchased
                  </span>
                  <span className="font-semibold text-gray-900">
                    {totalTicket()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Accumulated points</span>
                  <span className="font-semibold text-blue-600">
                    {100 * totalTicket()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Favorite movie</span>
                  <span className="font-semibold text-gray-900">Action</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
