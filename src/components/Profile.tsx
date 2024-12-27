import React from "react";
import { useAuth } from "../contexts/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoading } = useAuth(); 
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-xl font-semibold">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={() => navigate("/home")} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
        >
          Back to Home
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {/* Card Content */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Profile</h2>

            {/* Avatar Placeholder */}
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center text-white text-3xl font-semibold">
                {user.name.charAt(0)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <strong className="text-lg text-gray-600">Name:</strong>
                <p className="text-xl text-gray-800">{user.name}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-600">Email:</strong>
                <p className="text-xl text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
