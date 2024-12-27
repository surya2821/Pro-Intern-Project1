import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

type DashboardData = {
  totalUsers: number;
  totalProjects: number;
  totalMoneyRaised: number;
};

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Data for Bar Chart
  const barChartData = {
    labels: ["Total Users", "Total Projects", "Total Money Raised"],
    datasets: [
      {
        label: "Dashboard Metrics",
        data: [
          dashboardData?.totalUsers || 0,
          dashboardData?.totalProjects || 0,
          dashboardData?.totalMoneyRaised || 0,
        ],
        backgroundColor: ["#6366F1", "#10B981", "#F59E0B"],
        borderRadius: 10,
      },
    ],
  };

  // Data for Pie Chart
  const pieChartData = {
    labels: ["Users", "Projects", "Money Raised"],
    datasets: [
      {
        data: [
          dashboardData?.totalUsers || 0,
          dashboardData?.totalProjects || 0,
          dashboardData?.totalMoneyRaised || 0,
        ],
        backgroundColor: ["#6366F1", "#10B981", "#F59E0B"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div
      className="max-w-6xl mx-auto my-8 px-6 py-4 bg-gray-100 shadow-md rounded-lg"
      style={{ height: "600px", width: "900px", overflow: "hidden" }} // Fixed dashboard size
    >
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800">
        Monitoring Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-b-4 border-indigo-600">
          <h2 className="text-2xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-5xl font-extrabold text-indigo-600 mt-4">
            {dashboardData?.totalUsers || 0}
          </p>
        </div>

        {/* Total Projects */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-b-4 border-green-500">
          <h2 className="text-2xl font-semibold text-gray-700">Total Projects</h2>
          <p className="text-5xl font-extrabold text-green-600 mt-4">
            {dashboardData?.totalProjects || 0}
          </p>
        </div>

        {/* Total Money Raised */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-b-4 border-orange-500">
          <h2 className="text-2xl font-semibold text-gray-700">Total Money Raised</h2>
          <p className="text-5xl font-extrabold text-orange-600 mt-4">
            ₹{dashboardData?.totalMoneyRaised.toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* Scrollable Charts */}
      <div
        className="bg-white shadow-lg rounded-lg overflow-auto"
        style={{ height: "300px", width: "100%", padding: "20px" }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Charts Overview</h2>
        <div className="flex space-x-8">
          {/* Bar Chart */}
          <div style={{ minWidth: "500px", height: "250px" }}>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          {/* Pie Chart */}
          <div style={{ minWidth: "300px", height: "250px" }}>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
