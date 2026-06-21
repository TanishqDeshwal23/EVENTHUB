import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTicketAlt,
  FaCalendarAlt
} from "react-icons/fa";

function EventCard({ event }) {

  const formattedDate =
    event.date
      ? new Date(
          event.date
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric"
          }
        )
      : "Date TBA";

  return (

    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >

      {/* Image */}

      <div className="relative h-56">

        {event.image ? (

          <img
            src={event.image}
            alt={event.title}
            className="
            w-full
            h-full
            object-cover
            "
          />

        ) : (

          <div
            className="
            h-full
            flex
            items-center
            justify-center
            bg-slate-200
            "
          >
            No Image
          </div>

        )}

        {/* Category Badge */}

        <span
          className="
          absolute
          top-4
          left-4
          bg-cyan-600
          text-white
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
          "
        >
          {event.category}
        </span>

      </div>

      {/* Content */}

      <div className="p-5">

        <h2
          className="
          text-2xl
          font-bold
          mb-3
          line-clamp-2
          "
        >
          {event.title}
        </h2>

        <div className="space-y-2 mb-4">

          <p
            className="
            flex
            items-center
            gap-2
            text-gray-600
            "
          >
            <FaCalendarAlt />
            {formattedDate}
          </p>

          <p
            className="
            flex
            items-center
            gap-2
            text-gray-600
            "
          >
            <FaMapMarkerAlt />
            {event.venue}
          </p>

          <p
            className="
            flex
            items-center
            gap-2
            text-gray-600
            "
          >
            <FaTicketAlt />
            ₹{event.ticketPrice}
          </p>

        </div>

        {/* Seats */}

        <div className="mb-5">

          <div
            className="
            flex
            justify-between
            text-sm
            mb-1
            "
          >
            <span>
              Seats Left
            </span>

            <span>
              {
                event.availableSeats
              }
            </span>
          </div>

          <div
            className="
            w-full
            bg-slate-200
            rounded-full
            h-2
            "
          >
            <div
              className="
              bg-green-500
              h-2
              rounded-full
              "
              style={{
                width: `${Math.min(
                  (
                    event.availableSeats /
                    event.totalSeats
                  ) *
                    100,
                  100
                )}%`
              }}
            />
          </div>

        </div>

        {/* CTA */}

        <Link
          to={`/event/${event._id}`}
          className="
          block
          text-center
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          py-3
          rounded-xl
          font-semibold
          transition
          "
        >
          View Details
        </Link>

      </div>

    </div>

  );

}

export default EventCard;