import { useEffect, useState } from "react";
import API from "../services/api";
import generateTicket from "../utils/generateTicket";

import toast from "react-hot-toast";

import { FaTrash
} from "react-icons/fa";

import {
  FaTicketAlt,
  FaDownload,
  FaCalendarAlt,
  FaMoneyBillWave
} from "react-icons/fa";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    const fetchBookings =
      async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const res =
          await API.get(
            "/bookings/my-bookings",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`
              }
            }
          );

        setBookings(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    

    fetchBookings();

  

  }, []);

    const handleDelete =
  async (bookingId) => {

  const confirmDelete =
    window.confirm(
      "Cancel this booking?"
    );

  if (!confirmDelete)
    return;

  try {

    const userInfo =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    await API.delete(
      `/bookings/${bookingId}`,
      {
        headers: {
          Authorization:
            `Bearer ${userInfo.token}`
        }
      }
    );

    setBookings(
      bookings.filter(
        booking =>
          booking._id !==
          bookingId
      )
    );

    toast.success(
      "Booking Cancelled"
    );

  } catch (error) {

    toast.error(
      "Failed to Cancel Booking"
    );

  }

};

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-2">
          My Bookings
        </h1>

        <p className="text-gray-600 mb-8">
          Total Bookings:
          {" "}
          {bookings.length}
        </p>

        {bookings.length === 0 ? (

          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">

            <FaTicketAlt
              size={60}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-2xl font-bold mb-3">
              No Bookings Yet
            </h2>

            <p className="text-gray-500">
              Start exploring events
              and book your first ticket.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {bookings.map(
              (booking) => (

              <div
                key={booking._id}
                className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition
                "
              >

                {booking.event?.image && (

                  <img
                    src={
                      booking.event.image
                    }
                    alt={
                      booking.event.title
                    }
                    className="
                    h-52
                    w-full
                    object-cover
                    "
                  />

                )}

                <div className="p-5">

                  <h2 className="text-2xl font-bold mb-3">

                    {
                      booking.event?.title
                    }

                  </h2>

                  <div className="space-y-2">

                    <p>
                      <strong>
                        Booking ID:
                      </strong>
                      {" "}
                      {
                        booking._id
                      }
                    </p>

                    <p className="flex items-center gap-2">

                      <FaCalendarAlt />

                      Tickets:
                      {" "}
                      {
                        booking.quantity
                      }

                    </p>

                    <p className="flex items-center gap-2">

                      <FaMoneyBillWave />

                      ₹{
                        booking.totalAmount
                      }

                    </p>

                  </div>

                  <div className="mt-4">

                    <span
                      className="
                      bg-green-100
                      text-green-600
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-semibold
                      "
                    >
                      {
                        booking.paymentStatus
                      }
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      generateTicket(
                        booking
                      )
                    }
                    className="
                    w-full
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-cyan-600
                    hover:bg-cyan-700
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    "
                  >

                    <FaDownload />

                    Download Ticket

                  </button>

                  <button
  onClick={() =>
    handleDelete(
      booking._id
    )
  }
  className="
  w-full
  mt-3
  flex
  items-center
  justify-center
  gap-2
  bg-red-500
  hover:bg-red-600
  text-white
  py-3
  rounded-xl
  font-semibold
  "
>

  <FaTrash />

  Cancel Booking

</button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyBookings;