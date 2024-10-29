"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Event } from "@/types/types";
import EventDetails from "@/app/components/EventDetails";
import { useRouter } from "next/navigation";

export default function CustomerServiceOfficerDetail() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const { id } = useParams() as { id: string };
  const router = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const handleContactClick = () => {
    setIsContactPopupOpen(true);
  };

  const handleScheduleClick = async () => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "open", nextAction: "none" }),
      });

      if (res.ok) {
        const updatedEvent = await res.json();
        setEvent(updatedEvent);
        setIsSuccessPopupOpen(true);
        setTimeout(() => {
          setIsSuccessPopupOpen(false);
          router.push("/viewRequests");
        }, 2500);
      } else {
        alert("Failed to update event status.");
      }
    } catch (error) {
      console.error("Error updating event status:", error);
      alert("An error occurred while updating the event.");
    }
  };

  const handleClosePopup = () => {
    setIsContactPopupOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <EventDetails />

      {event.nextAction === "customerserviceofficer" && (
        <div className="flex gap-4">
          <button
            onClick={handleContactClick}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Contact Customer
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            onClick={handleScheduleClick}
          >
            Meeting Scheduled
          </button>
        </div>
      )}

      {/* Contact Popup */}
      {isContactPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold mb-4">Contact Customer</h2>
            <p>
              <strong>Name:</strong> {event.clientName}
            </p>
            <p>
              <strong>Phone:</strong> XXX-XXX-XXXX
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Update Successful!
            </h2>
            <p>
              The event status has been updated to <b>open</b>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
