import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function EventBookings() {

  const { eventId } = useParams();

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
            `/bookings/event/${eventId}`,
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

  }, [eventId]);

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Event Bookings
      </h1>

      {bookings.map(
        (booking) => (

        <div
          key={booking._id}
          className="border p-4 rounded mb-4"
        >

          <h3 className="font-bold">
            {
              booking.user?.name
            }
          </h3>

          <p>
            {
              booking.user?.email
            }
          </p>

          <p>
            Quantity:
            {
              booking.quantity
            }
          </p>

          <p>
            Amount:
            ₹{
              booking.totalAmount
            }
          </p>

          <p>
            Status:
            {
              booking.paymentStatus
            }
          </p>

        </div>

      ))}
    </div>
  );
}

export default EventBookings;