import React, { useState, useEffect } from "react";

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(""); // Add userId state

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.BACKEND_URL}/signin`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res = await response.json();

        if (res && res.userId) {
          // Store 'userId' in state or localStorage
          setUserId(res.userId);
          localStorage.setItem("userId", res.userId); // Store the token in localStorage
        }
        setToken(res.data);
        localStorage.setItem("token", res.data); // Store the token in localStorage
        console.log(res);
        localStorage.setItem("role", res.role);
        // console.log(res);
        window.location = `/${res.route}`;
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/logo.png"
          alt="Avon Company"
        />
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
            />
            <label
              htmlFor="Pass"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
            />

            {error && (
              <div className="text-center bg-red-500 text-white rounded p-2 mt-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign In
            </button>
          </form>
        </div>
        <div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              Sign Up Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
