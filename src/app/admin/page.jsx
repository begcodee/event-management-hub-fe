'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("allEvents");
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    date: "",
    time: "",
    capacity: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzVkZjdmNzBkNDE0YjEwNzNkN2Y2ZTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzQyMTM5MzgsImV4cCI6MTczNDIxNzUzOH0.R52WcQXcagG4m16lCtt5vQ9MNfi5fedYs6Wf7ipZBUs";

      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Event created successfully!");
      setErrorMessage("");
      setFormData({
        fullName: "",
        location: "",
        date: "",
        time: "",
        capacity: "",
      });
      fetchEvents(); // Refresh events list after creation
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-6 py-4 text-lg font-bold">Admin Dashboard</div>
        <button
          className={`px-6 py-4 text-left w-full ${
            activeTab === "allEvents" ? "bg-gray-900" : "hover:bg-gray-700"
          }`}
          onClick={() => handleTabChange("allEvents")}
        >
          All Events
        </button>
        <button
          className={`px-6 py-4 text-left w-full ${
            activeTab === "createEvent" ? "bg-gray-900" : "hover:bg-gray-700"
          }`}
          onClick={() => handleTabChange("createEvent")}
        >
          Create Event
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "allEvents" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">All Events</h1>
            {loading ? (
              <p>Loading events...</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">Location</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Time</th>
                    <th className="py-2 px-4 border-b text-left">Available Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="py-2 px-4 border-b">{event.name}</td>
                      <td className="py-2 px-4 border-b">{event.location}</td>
                      <td className="py-2 px-4 border-b">{event.date}</td>
                      <td className="py-2 px-4 border-b">{event.time}</td>
                      <td className="py-2 px-4 border-b">{event.availableSeats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

{activeTab === "createEvent" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Create Event</h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-5xl"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                  Event Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter event name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter event location"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                  Available Seats
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter available seats"
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-xs italic mb-4">{successMessage}</p>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
