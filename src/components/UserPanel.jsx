import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function UserPanel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        alert(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Available Products</h2>
        <ul className="space-y-4">
          {products.length > 0 ? (
            products.map((product) => (
              <li
                key={product.id}
                className="p-4 bg-gray-100 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 transition"
              >
                <span className="text-lg font-semibold text-gray-700">{product.name}</span>
                <span className="text-blue-600 font-bold">${product.price}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No products available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UserPanel;
