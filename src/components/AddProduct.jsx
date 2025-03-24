import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Import Firebase config
import { collection, addDoc } from "firebase/firestore";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProducts = async (e) => {
    e.preventDefault();

    if (!productName || !price) {
      alert("Please enter all the details");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: productName,
        price: parseFloat(price),
        createdAt: new Date(),
      });

      alert("Product added successfully!");
      setProductName("");
      setPrice("");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Product</h1>
        <form onSubmit={handleAddProducts} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
