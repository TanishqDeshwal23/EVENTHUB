import {
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from "react-icons/fa";

function Footer() {

  return (

    <footer className="bg-slate-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-cyan-400 mb-3">
              EventHub
            </h2>

            <p className="text-gray-400">
              Discover, Book & Manage
              Events with ease.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>
                Home
              </li>

              <li>
                Events
              </li>

              <li>
                My Bookings
              </li>

              <li>
                Dashboard
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              Connect
            </h3>

            <div className="flex gap-4 text-2xl">

              <FaGithub className="cursor-pointer hover:text-cyan-400" />

              <FaLinkedin className="cursor-pointer hover:text-cyan-400" />

              <FaEnvelope className="cursor-pointer hover:text-cyan-400" />

            </div>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-gray-400">

          © {new Date().getFullYear()} EventHub.
          All Rights Reserved.

        </div>

      </div>

    </footer>

  );

}

export default Footer;