import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !token) {
      navigate("/signin");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/orders/user/${userId}`);
        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        } else {
          setError("Could not fetch orders");
        }
      } catch (err) {
        setError("Could not fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>;

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl mb-4">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-gray-50 rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ₱{order.total?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{item.productName}</span>
                          <span className="text-gray-600 ml-2">× {item.quantity}</span>
                        </div>
                        <span className="font-semibold">₱{item.total?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Shipping Address:</h4>
                      <p className="text-gray-600">
                        {order.shippingAddress?.fullName}<br />
                        {order.shippingAddress?.address}<br />
                        {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-sm text-gray-600">Payment Method:</p>
                      <p className="font-medium capitalize">
                        {order.paymentMethod?.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}