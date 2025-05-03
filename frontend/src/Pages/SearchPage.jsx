import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = (value) => {
    fetch(`${process.env.BACKEND_URL}/products`)
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.filter((user) => {
          const lowerCaseValue = value.toLowerCase();
          return (
            lowerCaseValue &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(lowerCaseValue)
          );
        });
        setSearchResults(filteredResults);
        console.log(filteredResults);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-xs px-4 pt-16 pb-0 sm:px-6 lg:max-w-md lg:px-8">
        <input
          type="search"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
          placeholder="Search Makeup..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {searchResults.length === 0 ? (
          <div>
            <h1 className="text-center mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Product not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 text-center">
              Sorry, we couldn’t find the product you’re looking for.
            </p>
          </div>
        ) : (
          <div className="mt-0.5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {searchResults.map((product) => (
              <div key={product._id} className="group relative">
                <Link to={`/products/${product._id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt={product.variant}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </Link>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${product._id}`}>
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
                      ₱{product.saleprice}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
