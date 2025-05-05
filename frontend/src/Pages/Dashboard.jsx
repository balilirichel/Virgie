import React from "react";
import SideNav from "../Components/SideNav";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideNav /> {/* Display Sidebar only in the Dashboard page */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-4">Welcome to your dashboard!</p>
        {/* Add more content related to the dashboard here */}
        <div className="mt-6">
          <h2 className="text-xl font-medium">Stats Overview</h2>
          <p>Display your statistics or any other relevant information here.</p>
          {/* Add additional dashboard components like charts, stats, etc. */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
