import { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // Add state for the active category
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedProductsCount, setLikedProductsCount] = useState(0);
  const [userFirstName, setUserFirstName] = useState("");
  const navigation = {
    categories: [
      {
        id: "women",
        name: "Makeup",
        featured: [],
        sections: [
          {
            id: "clothing",
            name: "Eyes",
            items: [
              { name: "Brow Liner", href: "/products/subcategory/Brow Liner" },
              {
                name: "Brow Mascara",
                href: "/products/subcategory/Brow Mascara",
              },
              {
                name: "Brow Pencil",
                href: "/products/subcategory/Brow Pencil",
              },
              {
                name: "Eyeliner Pencil",
                href: "/products/subcategory/Eyeliner Pencil",
              },
              {
                name: "Eyeshadow Pallete",
                href: "/products/subcategory/Eyeshadow Pallete",
              },
              {
                name: "Liner Liquid",
                href: "/products/subcategory/Liner Liquid",
              },
              {
                name: "Liner Mechanic",
                href: "/products/subcategory/Liner Mechanic",
              },
              {
                name: "Liner Pencil",
                href: "/products/subcategory/Liner Pencil",
              },
              { name: "Mascara", href: "/products/subcategory/Mascara" },
            ],
          },
          {
            id: "accessories",
            name: "Face",
            items: [
              {
                name: "Blush Powder",
                href: "/products/subcategory/Blush Powder",
              },
              { name: "Cheek Tint", href: "/products/subcategory/Cheek Tint" },
              {
                name: "Concealer Liquid",
                href: "/products/subcategory/Concealer Liquid",
              },
              {
                name: "Dual Powder Foundation",
                href: "/products/subcategory/Dual Powder Foundation",
              },
              {
                name: "Foundation Cream",
                href: "/products/subcategory/Foundation Cream",
              },
              {
                name: "Foundation Cream To Powder",
                href: "/products/subcategory/Foundation Cream To Powder",
              },
              {
                name: "Foundation Liquid",
                href: "/products/subcategory/Foundation Liquid",
              },
              {
                name: "Pressed Powder",
                href: "/products/subcategory/Pressed Powder",
              },
            ],
          },
          {
            id: "brands",
            name: "Lips",
            items: [
              { name: "Lip Balm", href: "/products/subcategory/Lip Balm" },
              { name: "Lipstick", href: "/products/subcategory/Lipstick" },
              {
                name: "Liquid Lip Color",
                href: "/products/subcategory/Liquid Lip Color",
              },
            ],
          },
        ],
      },
    ],
    pages: [{ name: "About Us", href: "/about" }],
  };

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/signin"); // Navigate to the '/signin' route
  };
  const navigateToSignUp = () => {
    navigate("/signup"); // Navigate to the '/signup' route
  };
  useEffect(() => {
    const token = localStorage.getItem("token"); // Example: Retrieve token from localStorage
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, otherwise false

    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`${process.env.BACKEND_URL}/likes/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setLikedProductsCount(data.length);
        })
        .catch((error) => {
          console.error("Error fetching liked products:", error);
        });

      // Fetch firstName from the users endpoint
      fetch(`${process.env.BACKEND_URL}/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming the response contains a property called 'firstName'
          const { firstName } = data;
          setUserFirstName(firstName); // Set the first name to the state variable
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic here (clear token, etc.)
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    localStorage.removeItem("userId");
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
    window.location.reload();
  };

  return (
    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="z-50 relative lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className=" relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-pink-600 text-pink-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Browse now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>

                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-5">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900 hover:text-pink-600"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {isLoggedIn ? (
                    // User is logged in, show "Logged in" message and logout button
                    <>
                      <div className="flow-root">
                        <span className="font-medium text-gray-900 hover:text-gray-800">
                          Welcome {userFirstName}
                        </span>
                      </div>
                      <div className="flow-root">
                        <button
                          onClick={handleLogout}
                          className="font-medium text-gray-900 hover:text-gray-800 cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flow-root">
                        <button
                          onClick={navigateToSignIn}
                          className="font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                        >
                          Sign in
                        </button>
                      </div>
                      <div className="flow-root">
                        <button
                          onClick={navigateToSignUp}
                          className="font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                        >
                          Create account
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="z-20 relative bg-white">
        <p className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm text-sm font-medium text-white sm:px-6 lg:px-8">
          Give a Heart to Your Favorite Avon Makeup Products: Like and Explore!
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <button onClick={() => navigate("/")}>
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="/logo.png" alt="avon logo" />
                </button>
              </div>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-pink-600 text-pink-600"
                                  : "border-transparent text-gray-700 hover:text-pink-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                              onClick={() => setActiveCategory(category.name)}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8 z-100 relative overflow-hidden">
                                  <div className="gap-x-8 gap-y-10 py-1">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Browse now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-base">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-pink-700"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-pink-600"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {isLoggedIn ? (
                    // User is logged in, show "Logged in" message and logout button
                    <>
                      <span className="text-sm font-medium text-gray-700 mr-4">
                        Welcome {userFirstName}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    // User is not logged in, show "Sign In" and "Create Account" buttons
                    <>
                      <button
                        onClick={() => navigate("/signin")}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                      >
                        Sign in
                      </button>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <button
                        onClick={() => navigate("/signup")}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                      >
                        Create account
                      </button>
                    </>
                  )}
                </div>

                <div className="flex lg:ml-6">
                  <button
                    onClick={() => navigate("/searchpage")}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/likes" className="group -m-2 flex items-center p-2">
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {likedProductsCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
