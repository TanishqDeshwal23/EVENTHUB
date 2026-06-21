import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const res = await API.get(
          `/events/${id}`
        );

        setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        category: res.data.category || "",
        venue: res.data.venue || "",
        date: res.data.date
            ? res.data.date.split("T")[0]
            : "",
        ticketPrice:
            res.data.ticketPrice || "",
        totalSeats:
            res.data.totalSeats || "",
        image:
            res.data.image || "",
        status:
            res.data.status || "Upcoming"
        });

      } catch (error) {

        console.log(error);
        alert("Failed to load event");

      }

    };

    fetchEvent();

  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const uploadImage = async () => {

    if (!imageFile)
      return formData.image;

    const uploadData =
      new FormData();

    uploadData.append(
      "image",
      imageFile
    );

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const res = await API.post(
        "/upload/event-image",
        uploadData,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`
          }
        }
      );

      return res.data.imageUrl;

    } catch (error) {

      console.log(error);

      alert("Image Upload Failed");

      return formData.image;

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

      const updatedEvent = {
        ...formData,
        image: imageUrl
      };

      await API.put(
        `/events/${id}`,
        updatedEvent,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`
          }
        }
      );

      alert(
        "Event Updated Successfully"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

     console.log(error.response?.data);

        alert(
        JSON.stringify(
            error.response?.data
        )
        );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Title"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Description"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Category"
        />

        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Venue"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Ticket Price"
        />

        <input
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          className="border p-3 w-full"
          placeholder="Total Seats"
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Event"
            className="h-48 rounded"
          />
        )}

        <input
          type="file"
          accept="image/*"
          className="border p-3 w-full"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
        />

        <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-3 w-full"
        >
        <option value="Upcoming">
            Upcoming
        </option>

        <option value="Completed">
            Completed
        </option>

        <option value="Cancelled">
            Cancelled
        </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Updating..."
            : "Update Event"}
        </button>

      </form>

    </div>
  );
}

export default EditEvent;