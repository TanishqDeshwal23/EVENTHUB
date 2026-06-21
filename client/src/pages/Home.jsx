import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaTicketAlt,
  FaUsers
} from "react-icons/fa";
import EventCard from "../components/EventCard";
import API from "../services/api";
import { useEffect, useState } from "react";






function Home() {

  const images = [

  "https://images.unsplash.com/photo-1511578314322-379afb476865",

  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",

  "https://images.unsplash.com/photo-1540575467063-178a50c2df87",

  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"

];

const [featuredEvents,
  setFeaturedEvents] =
  useState([]);

const [currentImage,
  setCurrentImage] =
  useState(0);

  useEffect(() => {

  const interval =
    setInterval(() => {

      setCurrentImage(
        prev =>
          (prev + 1) %
          images.length
      );

    }, 3000);

  return () =>
    clearInterval(interval);

  

}, []);

useEffect(() => {

  const fetchFeaturedEvents =
    async () => {

    try {

      const res =
        await API.get(
          "/events/all"
        );

      setFeaturedEvents(
        res.data
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 3)
      );

    } catch (error) {

      console.log(error);

    }

  };

  fetchFeaturedEvents();

}, []);

  return (

    <div
      className={
        document.documentElement.classList.contains("dark")
          ? "bg-slate-950 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >

      {/* Hero Section */}

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white min-h-[85vh] flex items-center">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">

              Discover Amazing
              <span className="text-cyan-400">
                {" "}Events
              </span>

            </h1>

            <p className="text-xl text-gray-300 mb-8">

              Book conferences,
              workshops, concerts,
              sports events and much more
              in just a few clicks.

            </p>

            <div className="flex gap-4 flex-wrap">

              <Link
                to="/events"
                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
              >
                Browse Events
              </Link>

              <Link
                to="/register"
                className="border border-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-xl text-lg font-semibold transition"
              >
                Get Started
              </Link>

            </div>

          </div>

          <div className="hidden md:flex justify-center">

            <div className="relative">

            <img
              src={
                images[currentImage]
              }
              alt="Events"
              className="
              rounded-3xl
              shadow-2xl
              h-[500px]
              w-full
              object-cover
              transition-all
              duration-1000
              "
            />

            {/* Indicator Dots */}

            <div
              className="
              absolute
              bottom-5
              left-1/2
              -translate-x-1/2
              flex
              gap-2
              "
            >

              {images.map(
                (_, index) => (

                <div
                  key={index}
                  className={`
                    h-3
                    w-3
                    rounded-full
                    ${
                      currentImage === index
                        ? "bg-white"
                        : "bg-white/40"
                    }
                  `}
                />

              ))}

            </div>

          </div>

          </div>

        </div>

      </section>


      {/* Featured Events */}

        <section className="py-20 bg-slate-100">

          <div className="max-w-7xl mx-auto px-6">

            <div className="flex justify-between items-center mb-10">

              <div>

                <h2 className="text-4xl font-bold">
                  Featured Events
                </h2>

                <p className="text-gray-600 mt-2">
                  Discover what's happening
                  right now
                </p>

              </div>

              <Link
                to="/events"
                className="
                bg-cyan-600
                text-white
                px-5
                py-3
                rounded-xl
                hover:bg-cyan-700
                "
              >
                View All Events
              </Link>

            </div>

            {featuredEvents.length === 0 ? (

              <div className="text-center py-10">

                <p className="text-gray-500">
                  No events available
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {featuredEvents.map(
                  (event) => (

                  <EventCard
                    key={event._id}
                    event={event}
                  />

                ))}

              </div>

            )}

          </div>

        </section>

      {/* Features Section */}

      <section
        className={
          document.documentElement.classList.contains("dark")
            ? "bg-slate-900 py-20 text-white"
            : "bg-white py-20"
        }
      >

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">

            Why Choose EventHub?

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

           <div
            className={
              document.documentElement.classList.contains("dark")
                ? "bg-slate-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                : "bg-slate-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            }
          >
              <FaCalendarAlt
                size={40}
                className="text-cyan-500 mb-4"
              />

              <h3 className="text-2xl font-semibold mb-3">
                Discover Events
              </h3>

              <p
                className={
                  document.documentElement.classList.contains("dark")
                    ? "text-gray-300"
                    : "text-gray-600"
                }
              >
                Explore conferences,
                concerts, workshops and
                community events near you.
              </p>

            </div>

            <div className="bg-slate-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition">

              <FaTicketAlt
                size={40}
                className="text-cyan-500 mb-4"
              />

              <h3 className="text-2xl font-semibold mb-3">
                Instant Booking
              </h3>

              <p className="text-gray-600">
                Reserve tickets quickly
                with a smooth and secure
                booking process.
              </p>

            </div>

            <div className="bg-slate-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition">

              <FaUsers
                size={40}
                className="text-cyan-500 mb-4"
              />

              <h3 className="text-2xl font-semibold mb-3">
                Event Management
              </h3>

              <p className="text-gray-600">
                Organizers can create,
                manage and monitor events
                with powerful tools.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Stats Section */}

      <section className="bg-slate-900 text-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <h2 className="text-5xl font-bold text-cyan-400">
                100+
              </h2>

              <p className="mt-2 text-lg">
                Events Hosted
              </p>

            </div>

            <div>

              <h2 className="text-5xl font-bold text-cyan-400">
                10K+
              </h2>

              <p className="mt-2 text-lg">
                Tickets Booked
              </p>

            </div>

            <div>

              <h2 className="text-5xl font-bold text-cyan-400">
                5K+
              </h2>

              <p className="mt-2 text-lg">
                Active Users
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <section className="bg-cyan-600 text-white py-20 text-center">

        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-5xl font-bold mb-6">
            Ready to Join EventHub?
          </h2>

          <p className="text-xl mb-8">

            Discover amazing experiences
            and manage events effortlessly.

          </p>

          <Link
            to="/register"
            className="bg-white text-cyan-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition"
          >
            Create Free Account
          </Link>

        </div>

      </section>

    </div>

  );

}

export default Home;