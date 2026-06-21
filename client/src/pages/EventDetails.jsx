import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaUsers
} from "react-icons/fa";

import toast from "react-hot-toast";

function EventDetails() {

  const { id } = useParams();

  const [event, setEvent] =
    useState(null);

  const [timeLeft,
  setTimeLeft] =
  useState({});

  const [quantity, setQuantity] =
  useState(1);

const [showBooking,
  setShowBooking] =
  useState(false);

  const navigate =
    useNavigate();

  useEffect(() => {

    const fetchEvent =
      async () => {

      try {

        const res =
          await API.get(
            `/events/${id}`
          );

        setEvent(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchEvent();

  }, [id]);

  useEffect(() => {

  if (!event?.date) return;

  const interval =
    setInterval(() => {

      const now =
        new Date();

      const target =
        new Date(
          event.date
        );

      const difference =
        target - now;

      if (
        difference <= 0
      ) {

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });

        return;

      }

      setTimeLeft({

        days: Math.floor(
          difference /
          (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (
            difference %
            (1000 * 60 * 60 * 24)
          ) /
          (1000 * 60 * 60)
        ),

        minutes: Math.floor(
          (
            difference %
            (1000 * 60 * 60)
          ) /
          (1000 * 60)
        ),

        seconds: Math.floor(
          (
            difference %
            (1000 * 60)
          ) / 1000
        )

      });

    }, 1000);

  return () =>
    clearInterval(
      interval
    );

}, [event]);

  if (!event) {

    return (

      <div className="flex justify-center items-center h-screen">

        <h2 className="text-3xl font-bold">
          Loading...
        </h2>

      </div>

    );

  }

  const handleBooking =
    async () => {

    const userInfo =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    if (!userInfo) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;

    }

    if (
      quantity < 1 ||
      quantity >
        event.availableSeats
    ) {

      toast.error(
        "Invalid ticket quantity"
      );

      return;

    }

    try {

      await API.post(
        "/bookings/create",
        {
          eventId:
            event._id,
            quantity
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`
          }
        }
      );

      toast.success(
        "Ticket Booked Successfully"
      );

      setShowBooking(false);
      setQuantity(1);

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
        "Booking Failed"
      );

    }

  };

  const formattedDate =
    event.date
      ? new Date(
          event.date
        ).toLocaleDateString(
          "en-IN",
          {
            weekday:
              "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          }
        )
      : "Date TBA";

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* Hero Image */}

      <div className="relative h-[500px]">

        <img
          src={
            event.image
          }
          alt={
            event.title
          }
          className="
          w-full
          h-full
          object-cover
          "
        />

        <div
          className="
          absolute
          inset-0
          bg-black/50
          "
        />

        <div
          className="
          absolute
          bottom-10
          left-10
          text-white
          "
        >

          <span
            className="
            bg-cyan-600
            px-4
            py-2
            rounded-full
            "
          >
            {
              event.category
            }
          </span>

          <h1
            className="
            text-5xl
            font-bold
            mt-4
            "
          >
            {event.title}
          </h1>

        </div>

      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl p-8 shadow-lg">

              <h2 className="text-3xl font-bold mb-6">

                About Event

              </h2>

              <p
                className="
                text-gray-700
                leading-8
                text-lg
                "
              >
                {
                  event.description
                }
              </p>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">

                Event Info

              </h2>

              <div
                className="
                bg-cyan-50
                rounded-2xl
                p-5
                mb-6
                "
              >

                <h3
                  className="
                  text-lg
                  font-bold
                  text-cyan-700
                  mb-4
                  "
                >
                  Starts In
                </h3>

                <div
                  className="
                  grid
                  grid-cols-4
                  gap-2
                  text-center
                  "
                >

                  <div>

                    <p
                      className="
                      text-2xl
                      font-bold
                      "
                    >
                      {timeLeft.days || 0}
                    </p>

                    <span
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      Days
                    </span>

                  </div>

                  <div>

                    <p
                      className="
                      text-2xl
                      font-bold
                      "
                    >
                      {timeLeft.hours || 0}
                    </p>

                    <span
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      Hours
                    </span>

                  </div>

                 <div>

                    <p
                      className="
                      text-2xl
                      font-bold
                      "
                    >
                      {timeLeft.minutes || 0}
                    </p>

                    <span
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      Min
                    </span>

                  </div>

                  <div>

                    <p
                      className="
                      text-2xl
                      font-bold
                      "
                    >
                      {timeLeft.seconds || 0}
                    </p>

                    <span
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      Sec
                    </span>

                  </div>

                </div>

            </div>

              <div className="space-y-4">

                <p
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <FaCalendarAlt />
                  {formattedDate}
                </p>

                <p
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <FaMapMarkerAlt />
                  {event.venue}
                </p>

                <p
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <FaTicketAlt />
                  ₹{
                    event.ticketPrice
                  }
                </p>

                <p
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <FaUsers />
                  {
                    event.availableSeats
                  }
                  {" "}
                  Seats Left
                </p>

              </div>

              <button
                onClick={() =>
                  setShowBooking(true)
                }
                className="
                w-full
                mt-8
                bg-cyan-600
                hover:bg-cyan-700
                text-white
                py-4
                rounded-xl
                text-lg
                font-semibold
                "
              >
                Book Ticket
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Booking Modal */}

      {showBooking && (

        <div
          className="
          fixed inset-0
          bg-black/50
          flex items-center
          justify-center
          z-50
          "
        >

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            w-[450px]
            shadow-2xl
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Book Tickets
            </h2>

            <div className="mb-4">

              <label
                className="
                block
                mb-2
                font-medium
                "
              >
                Number of Tickets
              </label>

              <input
                type="number"
                min="1"
                max={
                  event.availableSeats
                }
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                w-full
                border
                p-3
                rounded-xl
                "
              />

            </div>

            <div
              className="
              bg-slate-100
              p-4
              rounded-xl
              mb-6
              "
            >

              <p className="mb-2">
                Ticket Price:
                ₹{event.ticketPrice}
              </p>

              <p className="mb-2">
                Quantity:
                {quantity}
              </p>

              <h3
                className="
                text-xl
                font-bold
                text-green-600
                "
              >
                Total:
                ₹
                {
                  quantity *
                  event.ticketPrice
                }
              </h3>

            </div>

            <div
              className="
              flex gap-3
              "
            >

              <button
                onClick={() =>
                  setShowBooking(false)
                }
                className="
                flex-1
                bg-gray-300
                py-3
                rounded-xl
                "
              >
                Cancel
              </button>

              <button
                onClick={handleBooking}
                className="
                flex-1
                bg-cyan-600
                text-white
                py-3
                rounded-xl
                hover:bg-cyan-700
                "
              >
                Confirm Booking
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default EventDetails;