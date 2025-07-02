import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { isAuth, user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {isAuth ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-6 text-center text-red-600 text-lg font-semibold">
          User Not Found!
        </div>
      )}
    </div>
  );
};

export default Profile;
