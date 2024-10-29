"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Event } from "@/types/types";
import EventDetails from "@/app/components/EventDetails";
import { useRouter } from "next/navigation";

export default function FinancialManagerDetail() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [finNote, setFinNote] = useState("");
  const { id } = useParams() as { id: string };
  const router = useRouter();

  // Function to fetch the event data
  async function fetchEvent(id: string) {
    try {
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      setEvent(data);
      setFinNote(data.finNote || ""); // initialize finNote from database if exists
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  }

  /* Fetching data from the API */
  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const handleSubmitFinNote = async () => {
    try {
      const res = await fetch(`/api/events/financeNote/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finNote }),
      });

      if (res.ok) {
        setIsSuccessPopupOpen(true);
        fetchEvent(String(event.id)); // Refresh the event data to reflect the updated finNote
        setTimeout(() => {
          setIsSuccessPopupOpen(false);
          router.push("/viewRequests");
        }, 2500);
      } else {
        alert("Failed to update financial note.");
      }
    } catch (error) {
      console.error("Error updating financial note:", error);
      alert("An error occurred while updating the financial note.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <EventDetails />

      {/* Financial Note Input */}
      {event.nextAction === "financialmanager" && (
        <div className="mt-6">
          <label htmlFor="finNote" className="block text-lg font-semibold">
            Budget Feedback and Notes
          </label>
          <textarea
            id="finNote"
            value={finNote}
            onChange={(e) => setFinNote(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            placeholder="Enter budget feedback or notes here..."
            rows={4}
          />
          <button
            onClick={handleSubmitFinNote}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Financial Note Saved!
            </h2>
            <p>Your feedback and notes have been successfully saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
