import { useState } from "react";
import API from "../services/api";

import toast from "react-hot-toast";

function CreateEvent() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    date: "",
    ticketPrice: "",
    totalSeats: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview,setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const uploadImage = async () => {

  if (!imageFile) return "";

  const uploadData = new FormData();

  uploadData.append("image", imageFile);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  try {

    const res = await API.post(
      "/upload/event-image",
      uploadData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    );

    return res.data.imageUrl;

  } catch (error) {

    console.log(error);

    toast.error(
      "Image Upload Failed"
    );
    return "";

  }
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const imageUrl =
        await uploadImage();

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const eventData = {
        ...formData,
        image: imageUrl
      };

      const res = await API.post(
        "/events/create",
        eventData,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`
          }
        }
      );

      console.log(res.data);

      toast.success(
        "Event Created Successfully"
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to Create Event"
      );

      setLoading(false);

    }

  };

  return (

    <div className="bg-slate-100 min-h-screen">

  <div className="max-w-6xl mx-auto p-8">

    <h1 className="text-4xl font-bold mb-8">
      Create New Event
    </h1>

    <form
      onSubmit={handleSubmit}
      className="grid lg:grid-cols-2 gap-8"
    >

      {/* Left */}

      <div className="bg-white p-6 rounded-3xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Event Information
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="6"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

        </div>

      </div>

      {/* Right */}

      <div className="bg-white p-6 rounded-3xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Event Details
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            className="
            border
            p-4
            w-full
            rounded-xl
            "
            onChange={handleChange}
          />

          <h3 className="font-bold text-lg mt-6">
            Event Banner
          </h3>

          <input
            type="file"
            accept="image/*"
            className="
            border
            p-3
            w-full
            rounded-xl
            "
            onChange={(e) => {

              const file =
                e.target.files[0];

              setImageFile(file);

              if (file) {

                setImagePreview(
                  URL.createObjectURL(file)
                );

              }

            }}
          />

          {imagePreview && (

            <div className="mt-4">

              <img
                src={imagePreview}
                alt="Preview"
                className="
                h-64
                w-full
                object-cover
                rounded-xl
                border
                "
              />

            </div>

          )}

        </div>

      </div>

      {/* Full Width Button */}

      <div className="lg:col-span-2">

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          py-4
          rounded-xl
          text-lg
          font-semibold
          transition
          "
        >
          {loading
            ? "Creating Event..."
            : "Create Event"}
        </button>

      </div>

    </form>

  </div>

</div>
  );
}

export default CreateEvent;