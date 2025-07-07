import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const user = data.data;
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || "");
        setPhone(user.phone || "");
      } else {
        alert("Failed to fetch user.");
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/users/update/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, role, phone }),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("User updated successfully!");
        navigate("/admin/userManagement");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating user.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            className="w-full border px-4 py-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
