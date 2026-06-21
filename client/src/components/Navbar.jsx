import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";



function Navbar() {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [showMenu,
  setShowMenu] =
  useState(false);
  
  

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");

    window.location.reload();

  };

  return (

    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          EventHub
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="hover:text-cyan-400 transition"
          >
            Events
          </Link>

          {!userInfo ? (

            <>
              <Link
                to="/login"
                className="hover:text-cyan-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>

          ) : (

            <>

              

              {userInfo.role ===
                "organizer" && (
                <>
                </>
              )}

              <div className="relative">

              <button
                onClick={() =>
                  setShowMenu(
                    !showMenu
                  )
                }
                className="
                bg-slate-800
                px-4
                py-2
                rounded-full
                border
                border-slate-700
                text-cyan-400
                font-medium
                "
              >
                😎 {userInfo.name} ▼
              </button>

              {showMenu && (

                <div
                  className="
                  absolute
                  right-0
                  mt-2
                  w-52
                  bg-white
                  text-black
                  rounded-xl
                  shadow-xl
                  overflow-hidden
                  z-50
                  "
                >

                  <Link
                    to="/my-bookings"
                    className="
                    block
                    px-4
                    py-3
                    hover:bg-slate-100
                    "
                  >
                    🎟 My Bookings
                  </Link>

                  {userInfo.role ===
                    "organizer" && (
                    <>
                      <Link
                        to="/dashboard"
                        className="
                        block
                        px-4
                        py-3
                        hover:bg-slate-100
                        "
                      >
                        📊 Dashboard
                      </Link>

                      <Link
                        to="/create-event"
                        className="
                        block
                        px-4
                        py-3
                        hover:bg-slate-100
                        "
                      >
                        ➕ Create Event
                      </Link>
                    </>
                  )}

                  <button
                    onClick={
                      logoutHandler
                    }
                    className="
                    w-full
                    text-left
                    px-4
                    py-3
                    text-red-600
                    hover:bg-red-50
                    "
                  >
                    🚪 Logout
                  </button>

                </div>

              )}

            </div>

            </>

          )}

          {/* Theme Toggle Visible To Everyone */}

          <ThemeToggle />

        </div>

      </div>

    </nav>

  );

}

export default Navbar;