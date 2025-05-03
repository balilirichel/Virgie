import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Subcategory({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/products/subcategory/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [category]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div>
          <p className="text-mg  text-gray-900">
            {products.length} Products Found
          </p>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {category}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.variant}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
              </div>

              <div className="object-left flex items-center">
                <p
                  className={`mt-1 text-sm ${
                    product.saleprice
                      ? "line-through text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  ₱{product.originalprice}
                </p>
                {product.saleprice && (
                  <p className="mt-1 ml-1.5 text-sm font-medium text-red-600">
                    ₱ {product.saleprice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
