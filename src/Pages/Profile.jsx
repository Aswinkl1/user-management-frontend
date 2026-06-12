import { useRef, useState } from "react";
import ProfileEditModal from "../components/Modal/ProfileEditModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();
  // 1. Local state for user data (In real app, use useSelector here)
  // const [user, setUser] = useState({
  //   name: "Aswin KL",
  //   email: "aswin@example.com",
  //   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aswin", // Free avatar API
  // });

  // 2. State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* --- PROFILE CARD --- */}
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Banner / Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8 relative">
          {/* Avatar Image (Overlapping the banner) */}
          <div className="relative -mt-16 mb-4 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <img
                src={
                  user.profilePic ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aswin"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Camera Icon Badge */}
          </div>

          {/* Text Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
              <span className="text-sm">{user.email}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition shadow-md shadow-indigo-200"
            >
              back
            </button>
          </div>
        </div>
      </div>
      {/* --- EDIT MODAL --- */}
      {isModalOpen && (
        <ProfileEditModal
          currentUser={user}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

// export default EditModal;

export default Profile;
