'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://event-management-hub-backend.onrender.com/api/events");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <table className="w-full text-left border-collapse border border-gray-700">
          <caption className="text-lg font-medium mb-4 text-center">
            A list of upcoming events you can RSVP to.
          </caption>
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-700 px-4 py-2">Location</th>
              <th className="border border-gray-700 px-4 py-2">Date</th>
              <th className="border border-gray-700 px-4 py-2">Time</th>
              <th className="border border-gray-700 px-4 py-2">Available Seats</th>
              <th className="border border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="odd:bg-gray-100 even:bg-gray-200">
                  <td className="border border-gray-700 px-4 py-2 font-medium">
                    {event.name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{event.location}</td>
                  <td className="border border-gray-700 px-4 py-2">{event.date}</td>
                  <td className="border border-gray-700 px-4 py-2">{event.time}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {event.availableSeats}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    <button
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => alert(`RSVP for ${event.name}`)}
                    >
                      RSVP
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center border border-gray-700 px-4 py-2"
                >
                  No events available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventListing;
