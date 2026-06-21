import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart({ stats }) {

  const data = {
    labels: [
      "Events",
      "Bookings",
      "Revenue"
    ],
    datasets: [
      {
        label: "Dashboard Analytics",
        data: [
          stats.totalEvents,
          stats.totalBookings,
          stats.totalRevenue
        ]
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Analytics Overview
      </h2>

      <Bar data={data} />
    </div>
  );
}

export default RevenueChart;