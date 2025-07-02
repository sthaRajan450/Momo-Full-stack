import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/getSingleProduct/${id}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        const product = data.data;
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setQuantity(product.quantity);
      } else {
        alert("Failed to fetch product.");
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, price, description }),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Product updated successfully!");
        navigate("/admin/productManagement");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating product.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
