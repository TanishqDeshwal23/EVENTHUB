import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All");

  useEffect(() => {

    const fetchEvents =
      async () => {

      try {

        const res =
          await API.get(
            "/events/all"
          );

        setEvents(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchEvents();

  }, []);

  const categories = [
    "All",
    ...new Set(
      events.map(
        event =>
          event.category
      )
    )
  ];

  const filteredEvents =
    events.filter(
      (event) => {

      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory ===
        "All"
          ? true
          : event.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto py-10 px-5">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold mb-3">
            Upcoming Events
          </h1>

          <p className="text-gray-600 text-lg">
            Discover and book
            amazing experiences
          </p>

        </div>

        {/* Search */}

        <div className="max-w-2xl mx-auto mb-8">

          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="
            w-full
            p-4
            rounded-xl
            border
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
            "
          />

        </div>

        {/* Categories */}

        <div className="flex flex-wrap justify-center gap-3 mb-8">

          {categories.map(
            (category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory ===
                category
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-gray-700 hover:bg-cyan-100"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Count */}

        <div className="mb-8">

          <p className="text-gray-600 font-medium">

            Showing
            {" "}
            {
              filteredEvents.length
            }
            {" "}
            event(s)

          </p>

        </div>

        {/* Events Grid */}

        {filteredEvents.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold mb-3">
              No Events Found
            </h2>

            <p className="text-gray-500">
              Try a different search
              or category.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredEvents.map(
              (event) => (

              <EventCard
                key={event._id}
                event={event}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Events;