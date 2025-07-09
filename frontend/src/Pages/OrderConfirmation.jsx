import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/orders/${orderId}`);
        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        setError("Could not fetch order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                <p><strong>Order Number:</strong> {order?.orderNumber}</p>
                <p><strong>Status:</strong> <span className="capitalize">{order?.status}</span></p>
                <p><strong>Payment Method:</strong> <span className="capitalize">{order?.paymentMethod?.replace('_', ' ')}</span></p>
                <p><strong>Total:</strong> ₱{order?.total?.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                <p>{order?.shippingAddress?.fullName}</p>
                <p>{order?.shippingAddress?.address}</p>
                <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}</p>
                <p>{order?.shippingAddress?.country}</p>
              </div>
            </div>
          </div>

          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {order?.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₱{item.total?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}