import { useEffect, useState } from "react";
import SideNav from "../Components/SideNav";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/products?page=${currentPage}`
        );
        const data = await response.json();
        const formattedProducts = data.map((product) => ({
          name: product.name,
          subcategory: product.subcategory,
          price: product.originalprice,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6 bg-pink-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">All Products</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-pink-200 rounded">
            <thead className="bg-pink-200 text-pink-700">
              <tr>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Sub Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-t border-pink-200 even:bg-pink-50"
                >
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.subcategory}</td>
                  <td className="py-3 px-4">${product.price}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Simple pagination (optional enhancement) */}
        <div className="mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 mr-2 bg-pink-300 rounded hover:bg-pink-400"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-pink-300 rounded hover:bg-pink-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
