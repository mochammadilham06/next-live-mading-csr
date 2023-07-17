import React from "react";
import AdminLayout from "../page";
import Card from "@live-component/Card";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h3 className="text-xl font-bold text-gray-400 my-5">Dashboard</h3>
      <Card>
        <p className="text-sm text-slate-900">Content here</p>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;
