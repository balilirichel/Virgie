import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.BACKEND_URL}/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        // User created successfully
        navigate("/signin");
      } else {
        // Handle error response
        const responseData = await response.json();
        setError(responseData.message);
      }
    } catch (error) {
      setError("An error occurred while signing up.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-9 lg:px-8">
      {/*signup container*/}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {" "}
        {/*signup form container*/}
        <div>
          {" "}
          {/*styles left*/}
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {" "}
          {/*style right*/}
          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            {/*form container*/}
            <label
              htmlFor="firstname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              //input
            />
            <label
              htmlFor="lastname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              //input
            />
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
              //input
            />
            <label
              htmlFor="pass"
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
              //input
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
              {" "}
              {/*green button*/}
              Sign Up
            </button>
          </form>
        </div>
        <div className="justify-center text-sm">
          <a
            href="/signin"
            className="font-semibold text-pink-600 hover:text-pink-500"
          >
            Already a member? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
