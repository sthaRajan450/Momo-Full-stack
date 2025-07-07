import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/users/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpdate = (userId) => {
    console.log("Update user:", userId);
    navigate(`/editUser/${userId}`);
  };

  const handleDelete = async (userId) => {
    console.log("Delete user:", userId);
    try {
      let response = await fetch(
        `http://localhost:9000/api/users/delete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        response = await response.json();
        alert(response.message);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {users.length > 0 ? (
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border capitalize">{user.role}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-600">No users found.</div>
      )}
    </div>
  );
};

export default UserManagement;
