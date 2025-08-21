import BookingHistory from "./BookingHistory";
import Modal from "./Modal";
import Profile from "./Profile";
import { Calendar, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/user.slice";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { activeTab, isEditModalOpen } = useSelector(
    (state) => state.userSlice
  );

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to={"/login"} />;
  return (
    <div className="min-h-screen bg-gray-900 py-8 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-1">
              Manage personal information and ticket booking history
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => dispatch(setActiveTab("profile"))}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Personal Information
            </button>
            <button
              onClick={() => dispatch(setActiveTab("history"))}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Booking History
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && <Profile />}

        {/* Edit Modal */}
        {isEditModalOpen && (<Modal />)}

        {/* Booking History Tab */}
        {activeTab === "history" && <BookingHistory />}
      </div>
    </div>
  );
}
