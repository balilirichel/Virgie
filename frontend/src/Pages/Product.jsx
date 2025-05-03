import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Error from "./Error";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const { productId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Simulate fetching product data from an API
    // Replace with an actual API call, using the provided productId
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/products/${productId}`
        ); // Replace with your API endpoint
        if (response.status === 404) {
          setError("Product not found");
        } else if (response.ok) {
          const productData = await response.json();
          setProduct(productData);

          //new
          if (userId) {
            const likeResponse = await fetch(
              `${process.env.BACKEND_URL}/likes/${userId}/${productId}`
            );
            if (likeResponse.status === 200) {
              setLiked(true);
            }
          }
          //new
        } else {
          setError("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Fetch data whenever productId changes

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <Error message={error} linkText="Go back home" linkUrl="/" />;
  }

  const handleRemoveToLikes = async () => {
    try {
      // First, send a GET request to fetch the liked item's ID
      const response = await fetch(
        `${process.env.BACKEND_URL}/likes/${userId}/${productId}`
      );
      if (response.status === 200) {
        const like = await response.json();

        // Now that you have the liked item's ID, you can send a DELETE request to remove it
        const deleteResponse = await fetch(
          `${process.env.BACKEND_URL}/likes/delete/${like._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteResponse.status === 204 || 200) {
          // The like was successfully removed
          setLiked(false);
          window.location.reload();
        } else {
          console.error(
            "Failed to remove the like. Status code: " + deleteResponse.status
          );
        }
      } else {
        console.error(
          "Failed to fetch liked item. Status code: " + response.status
        );
      }
    } catch (error) {
      console.error("Error removing from likes:", error);
    }
  };

  const handleAddToLikes = async () => {
    if (!token) {
      alert("You need to be logged in.");
      navigateTo("/signin"); // Redirect the user to /signin route
      return;
    }
    try {
      // If the product is not liked, send a POST request to add it
      const response = await fetch(`${process.env.BACKEND_URL}/likes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      });

      if (response.status === 201) {
        // The like was successfully added
        setLiked(true);
        window.location.reload();
      } else {
        // Handle errors, e.g., show a message to the user
      }
    } catch (error) {
      console.error("Error adding/removing from likes:", error);
    }
  };

  // If product is found, continue rendering the product details
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-1">
            <div className="sm:rounded-lg">
              <img
                src={product.image}
                alt={product.image}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                <p
                  className={`text-3xl tracking-tight text-gray-900 ${
                    product.saleprice ? "line-through" : ""
                  }`}
                >
                  ₱ {product.originalprice}
                </p>
                {product.saleprice && (
                  <p className="text-red-600 text-3xl tracking-tight ml-4">
                    ₱ {product.saleprice}
                  </p>
                )}
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Variants
                  </h3>
                </div>
                <div className="grid grid-cols-4 sm:text-center gap-4 sm:grid-cols-6 lg:grid-cols-4">
                  {product.variant.map((variant, index) => (
                    <div
                      key={index}
                      className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white"
                    >
                      {variant}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={liked ? handleRemoveToLikes : handleAddToLikes}
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium text-white hover-bg-pink-700 focus:outline-none focus:ring-2 focus-ring-pink-500 focus-ring-offset-2${
                  liked ? "bg-gray-300" : ""
                }`}
              >
                {liked ? "Remove from likes" : "Add to likes"}
              </button>

              <div className="py-10">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
