// components/SideNav.jsx
import { HiChartPie, HiInbox, HiUser, HiShoppingBag } from "react-icons/hi";

const SideNav = () => {
  return (
    <aside className="w-64 h-screen bg-pink-500 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">Dashboard</div>
      <nav className="flex flex-col space-y-4">
        <a
          href="/"
          className="flex items-center gap-3 p-2 hover:bg-pink-500 rounded"
        >
          <HiChartPie className="text-xl" />
          <span>Overview</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 hover:bg-pink-500 rounded"
        >
          <HiInbox className="text-xl" />
          <span>Inbox</span>
        </a>
        <a
          href="/members"
          className="flex items-center gap-3 p-2 hover:bg-pink-500 rounded"
        >
          <HiUser className="text-xl" />
          <span>Users</span>
        </a>
        <a
          href="/allproducts"
          className="flex items-center gap-3 p-2 hover:bg-pink-500 rounded"
        >
          <HiShoppingBag className="text-xl" />
          <span>Products</span>
        </a>
      </nav>
    </aside>
  );
};

export default SideNav;
