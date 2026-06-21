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

function EventRevenueChart({
  chartData
}) {

  const data = {

    labels:
      chartData.map(
        event => event.title
      ),

    datasets: [
      {
        label:
          "Revenue (₹)",

        data:
          chartData.map(
            event =>
              event.revenue
          ),

        backgroundColor:
          "rgba(6,182,212,0.8)"
      }
    ]
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {
        display: false
      }

    }

  };

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">

        Revenue Per Event

      </h2>

      <Bar
        data={data}
        options={options}
      />

    </div>

  );

}

export default EventRevenueChart;