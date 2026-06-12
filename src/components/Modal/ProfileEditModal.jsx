import axios from "axios";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/features/auth/authSlice";
import axoisApi from "../../axios";

const ProfileEditModal = ({
  currentUser,
  onClose,
  onSave,
  isAdmin = false,
  handleDidEdit = () => {},
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(currentUser);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(fileInputRef.current.files[0]);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setFormData({ ...formData, profilePic: imageUrl, file: file });
    }
  };

  async function uploadToClodinary(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "user_management");
    data.append("cloud_name", "findpix");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/findpix/image/upload",
        data
      );

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    console.log("file", file);
    console.log(formData);
    const data = {};
    data.name = formData.name;
    data.email = formData.email;
    data.id = formData.id || formData._id;

    try {
      let url;
      if (file) {
        url = await uploadToClodinary(file);
      } else {
        url = formData?.profilePic ?? "";
      }
      console.log(url);
      // const url =
      //   "http://res.cloudinary.com/findpix/image/upload/v1765202826/geydceifrqxd4qye4v2c.jpg";
      data.url = url;
      const response = await axoisApi.put("/edit_user", data);
      if (!isAdmin) {
        dispatch(updateUser(response.data));
      } else {
        handleDidEdit();
      }
    } catch (error) {
      console.log(error);
    }

    // onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Edit Profile</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            {/* Simple Close Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {/* Image Preview */}
              <div className="w-24 h-24 rounded-full border-4 border-gray-100 overflow-hidden shadow-sm">
                <img
                  src={formData.profilePic}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-xs font-semibold">Change</span>
              </div>

              {/* Badge (Camera Icon SVG) */}
              <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Click to change photo</p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Text Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md shadow-indigo-200 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
