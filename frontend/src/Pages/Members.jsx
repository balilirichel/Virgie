import { useEffect, useState } from "react";
import SideNav from "../Components/SideNav";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/users`);
        const data = await response.json();
        const formattedMembers = data.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }));
        setMembers(formattedMembers); // Store in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6 bg-pink-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Members</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-pink-200 rounded">
            <thead className="bg-pink-200 text-pink-700">
              <tr>
                <th className="py-3 px-4 text-left">First Name</th>
                <th className="py-3 px-4 text-left">Last Name</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={index}
                  className="border-t border-pink-200 even:bg-pink-50"
                >
                  <td className="py-3 px-4">{member.firstName}</td>
                  <td className="py-3 px-4">{member.lastName}</td>
                  <td className="py-3 px-4">{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
