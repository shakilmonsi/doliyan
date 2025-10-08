import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaSave, FaEdit } from "react-icons/fa";
import { getCurrentUser } from "../../../features/auth/authUtils";
import { STORAGE } from "../../../utils/storage";

const AdminProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "admin",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const admin = getCurrentUser();

  const userName = admin?.name?.en || admin?.name || "Admin User";

  useEffect(() => {
    // Load user data from localStorage or API

    setUser({
      name: userName,
      email: admin.email,
      phone: admin.phone || "+880000000000",
      role: admin.role,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!user.name) newErrors.name = "Name is required";

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }

    if (password.new && password.new !== password.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // In a real app, you would call an API here
    const updatedUser = { ...user };
    STORAGE.setUser(updatedUser);

    if (password.new) {
      // Handle password change (would call API in real app)
      setPassword({ current: "", new: "", confirm: "" });
    }

    setIsEditing(false);
    alert("Profile updated successfully");
  };

  return (
    <div className="mx-auto max-w-6xl pt-20">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        {/* Profile Header */}
        <div className="bg-indigo-100 p-6 text-white">
          <div className="flex items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500">
              <FaUser className="h-10 w-10" />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold capitalize">{user.name}</h2>
              <p className="text-indigo-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Personal Info */}
            <div>
              <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                <FaUser className="mr-2" /> Personal Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="rounded-md bg-gray-50 px-4 py-2">
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="rounded-md bg-gray-50 px-4 py-2">
                      {user.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2"
                    />
                  ) : (
                    <p className="rounded-md bg-gray-50 px-4 py-2">
                      {user.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div>
              <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                <FaLock className="mr-2" /> Password
              </h3>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new"
                      value={password.new}
                      onChange={handlePasswordChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      className={`w-full rounded-md border px-4 py-2 ${errors.confirm ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.confirm && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.confirm}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-gray-50 px-4 py-8 text-center">
                  <p className="text-gray-500">Password hidden for security</p>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
