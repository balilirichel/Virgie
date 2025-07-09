import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !token) {
      navigate("/signin");
      return;
    }
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/carts`);
        if (response.ok) {
          const allCarts = await response.json();
          const userCarts = allCarts.filter((item) => item.userId === userId);
          // Fetch product details for each cart item
          const productDetails = await Promise.all(
            userCarts.map(async (item) => {
              try {
                const res = await fetch(
                  `${process.env.BACKEND_URL}/products/${item.productId}`
                );
                if (res.ok) {
                  const prod = await res.json();
                  return {
                    ...item,
                    productName: prod.name,
                    productImage: prod.image,
                  };
                }
              } catch (e) {}
              return { ...item, productName: item.productId };
            })
          );
          setCartItems(productDetails);
        } else {
          setError("Could not fetch cart items");
        }
      } catch (err) {
        setError("Could not fetch cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId, token, navigate]);

  const handleRemove = async (cartId) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/carts/delete/${cartId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== cartId));
      }
    } catch (err) {
      // Optionally show error
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
    );

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="bg-gray-50 rounded-lg shadow p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 font-medium text-gray-900">
                      {/* Show product image and name if available */}
                      {item.productImage && (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="inline-block w-10 h-10 object-cover rounded mr-2 align-middle"
                        />
                      )}
                      {item.productName}
                    </td>
                    <td className="py-3 text-pink-600 font-semibold">
                      ₱ {item.price?.toLocaleString()}
                    </td>
                    <td className="py-3">{item.quantity}</td>
                    <td className="py-3 font-semibold">
                      ₱ {(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-white bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded shadow"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="text-xl font-bold text-gray-900">
                Total: ₱ {getTotal().toLocaleString()}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-semibold shadow"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
