import React, { useEffect, useState } from "react";
import axoisApi from "../../axios";
import ProfileEditModal from "../../components/Modal/ProfileEditModal";
import toast from "react-hot-toast";
import AddUserModal from "../../components/Modal/AddUserModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";

// --- Inline Icons to avoid external dependencies ---

const IconLogout = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const IconEdit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconTrash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const IconUser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

async function getAllUsers(search = "", page = 1, limit = 4) {
  try {
    const response = await axoisApi.get(
      `/admin?search=${search}&page=${page}&limit=${limit}`
    );
    console.log(response.data.users);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// function filterUserBasedOnSearch(data, input) {
//   input = input.trim().toLowerCase();
//   if (!input) {
//     return data;
//   }
//   const updateUsers = data.filter(
//     (user) =>
//       user.name.toLowerCase().includes(input) ||
//       user.email.toLowerCase().includes(input)
//   );

//   return updateUsers;
// }

// --- Main Component ---

export default function App() {
  function handleEdit(data) {
    setIsOpen(true);
    setModaData(data);
  }

  async function addUser(data) {
    try {
      await axoisApi.post("/admin/addUser", data);
      toast.success("user added successfully");
      setDidEdit((s) => !s);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const [users, setUsers] = useState([]);

  const [isopen, setIsOpen] = useState(false);
  const [modalData, setModaData] = useState(null);
  const [didEdit, setDidEdit] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getAllUsers(search, currentPage);
      console.log(data);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    })();
  }, [didEdit, search, currentPage]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? (UI Demo Only)"
      )
    ) {
      try {
        await axoisApi.delete(`/admin/delete/${id}`);
        toast.error("user deleted successfully");
        setDidEdit((state) => !state);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <IconUser />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              AdminPanel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 hidden sm:block">
              Logged in as{" "}
              <span className="font-medium text-gray-900">Administrator</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <IconLogout />
              Logout
            </button>
          </div>
        </div>
      </header>
      {isopen && (
        <ProfileEditModal
          isAdmin={true}
          currentUser={modalData}
          onClose={() => setIsOpen(false)}
          handleDidEdit={() => {
            setDidEdit((state) => !state);
          }}
        />
      )}

      {addUserModal && (
        <AddUserModal
          onClose={() => {
            setAddUserModal((s) => !s);
          }}
          onSubmit={addUser}
        />
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              User Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage user access, roles, and account status.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              onClick={() => {
                setAddUserModal((s) => !s);
              }}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New User
            </button>
          </div>
        </div>

        {/* Search & Filter Bar (Visual only) */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconSearch />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm"
              placeholder="Search users..."
              onChange={(e) => {
                setSearch(e.target.value.trim());
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    User Info
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${user.avatarColor}`}
                        >
                          {user.profilePic && (
                            <img
                              className="rounded-2xl"
                              src={user.profilePic}
                            ></img>
                          )}
                          {!user.profilePic && user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                            {/* {currentPage} */}
                          </div>
                          {/* <div className="text-sm text-gray-500">
                            {user.email}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 font-medium">
                        {user.email}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset
                        ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700 ring-green-600/20"
                            : user.status === "Inactive"
                            ? "bg-gray-50 text-gray-600 ring-gray-500/10"
                            : "bg-red-50 text-red-700 ring-red-600/10"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            handleEdit(user);
                          }}
                          className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                          title="Edit User"
                        >
                          <IconEdit />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                          title="Delete User"
                        >
                          <IconTrash />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simple Pagination Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div className="invisible">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">20</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  {Array.from({ length: totalPages }, (_, i) => {
                    return currentPage == i + 1 ? (
                      <button
                        value={i + 1}
                        onClick={(e) => {
                          setCurrentPage(e.target.value);
                        }}
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {i + 1}
                      </button>
                    ) : (
                      <button
                        value={i + 1}
                        onClick={(e) => {
                          setCurrentPage(e.target.value);
                        }}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
