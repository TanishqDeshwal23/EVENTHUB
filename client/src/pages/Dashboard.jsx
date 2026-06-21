import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";


import EventRevenueChart
from "../components/EventRevenueChart";

import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTicketAlt,
  FaEdit,
  FaTrash,
  FaUsers
} from "react-icons/fa";

function Dashboard() {

  const [events, setEvents] = useState([]);

  const [chartData,
  setChartData] =
  useState([]);

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0
  });

  const [
  recentBookings,
  setRecentBookings
] = useState([]);

  const [
  insights,
  setInsights
] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const eventRes = await API.get(
          "/events/my-events",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`
            }
          }
        );

        const statsRes = await API.get(
          "/dashboard/stats",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`
            }
          }
        );

        const bookingRes =
          await API.get(
            "/dashboard/recent-bookings",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`
              }
            }
          );

        setRecentBookings(
          bookingRes.data
        );

        const insightRes =
          await API.get(
            "/dashboard/event-insights",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`
              }
            }
          );

        setInsights(
          insightRes.data
        );

        const chartRes =
        await API.get(
          "/dashboard/revenue-chart",
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`
            }
          }
        );

        console.log("EVENTS:", eventRes.data);
        console.log("STATS:", statsRes.data);
        console.log("CHART:", chartRes.data);

        setChartData(chartRes.data);
        setEvents(eventRes.data);
        setStats(statsRes.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  const handleDelete = async (
    eventId
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this event?"
      );

    if (!confirmDelete) return;

    try {

      const userInfo = JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

      await API.delete(
        `/events/${eventId}`,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`
          }
        }
      );

      setEvents(
        events.filter(
          (event) =>
            event._id !== eventId
        )
      );

      toast.success(
        "Event Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };
  const getInsight = (
  eventId
) => {

  return insights.find(
    insight =>
      insight.eventId === eventId
  );

};

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-10">
          Organizer Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-lg">

            <FaCalendarAlt
              size={35}
              className="mb-3"
            />

            <h2 className="text-lg">
              Total Events
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalEvents}
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">

            <FaMoneyBillWave
              size={35}
              className="mb-3"
            />

            <h2 className="text-lg">
              Revenue
            </h2>

            <p className="text-4xl font-bold">
              ₹{stats.totalRevenue}
            </p>

          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">

            <FaTicketAlt
              size={35}
              className="mb-3"
            />

            <h2 className="text-lg">
              Bookings
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalBookings}
            </p>

          </div>

        </div>

        <div className="mb-12">

  <EventRevenueChart
    chartData={chartData}
  />

</div>

{/* Recent Bookings */}

<div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

  <h2 className="text-2xl font-bold mb-5">
    Recent Bookings
  </h2>

  {recentBookings.length === 0 ? (

    <p className="text-gray-500">
      No bookings yet
    </p>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b bg-slate-50">

            <th className="text-left py-3 px-2">
              User
            </th>

            <th className="text-left py-3 px-2">
              Event
            </th>

            <th className="text-left py-3 px-2">
              Quantity
            </th>

            <th className="text-left py-3 px-2">
              Amount
            </th>

            <th className="text-left py-3 px-2">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {recentBookings.map(
            (booking) => (

            <tr
              key={booking._id}
              className="border-b hover:bg-slate-50"
            >

              <td className="py-3 px-2">
                {booking.user?.name}
              </td>

              <td className="py-3 px-2">
                {booking.event?.title}
              </td>

              <td className="py-3 px-2">
                {booking.quantity}
              </td>

              <td className="py-3 px-2 font-semibold text-green-600">
                ₹{booking.totalAmount}
              </td>

              <td className="py-3 px-2">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.paymentStatus ===
                    "Completed"
                      ? "bg-green-100 text-green-600"
                      : booking.paymentStatus ===
                        "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {booking.paymentStatus}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>
        {/* Events */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            My Events
          </h2>

          <Link
            to="/create-event"
            className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700"
          >
            + Create Event
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {events.map((event) => (

            <div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              {event.image && (

                <img
                  src={event.image}
                  alt={event.title}
                  className="h-52 w-full object-cover"
                />

              )}

              <div className="p-5">

                <h3 className="text-2xl font-bold mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-600 mb-2">
                  📍 {event.venue}
                </p>

                <p className="text-gray-600 mb-2">
                  🎟 ₹{event.ticketPrice}
                </p>

               <div className="mt-4 border-t pt-3">

                <p className="text-blue-600 font-semibold">

                  📈 Bookings:
                  {" "}
                  {
                    getInsight(
                      event._id
                    )?.totalBookings || 0
                  }

                </p>

                <p className="text-green-600 font-semibold">

                  💰 Revenue:
                  ₹{
                    getInsight(
                      event._id
                    )?.totalRevenue || 0
                  }

                </p>

                <p className="text-purple-600 font-semibold">

                  📊 Occupancy:
                  {
                    getInsight(
                      event._id
                    )?.occupancy || 0
                  }%

                </p>

              </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.status ===
                    "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : event.status ===
                        "Completed"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {event.status ||
                    "Upcoming"}
                </span>

                <div className="flex flex-wrap gap-2 mt-5">

                  <Link
                    to={`/edit-event/${event._id}`}
                    className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    <FaEdit />
                    Edit
                  </Link>

                  <Link
                    to={`/event-bookings/${event._id}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FaUsers />
                    Bookings
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        event._id
                      )
                    }
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;