import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import MyBookings from "./pages/MyBookings";
import EditEvent from "./pages/EditEvent";
import EventBookings from "./pages/EventBookings";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/events" element={<Events />} />

        <Route path="/event/:id" element={<EventDetails />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-event" element={<CreateEvent />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/edit-event/:id" element={<EditEvent />} />

        <Route path="/event-bookings/:eventId" element={<EventBookings />} />

      </Routes>

      <Footer />

      

    </BrowserRouter>

  );
}

export default App;