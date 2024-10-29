"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Event } from "@/types/types";
import EventDetails from "@/app/components/EventDetails";
import { useRouter } from "next/navigation";

export default function AdminManager() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const { id } = useParams() as { id: string };
  const router = useRouter();

  async function fetchEvent(id: string) {
    try {
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  }
  /* Fetching data from the API */
  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  //TODO: Add some more interesting loading options, and potentially a skeleton somewhere. Can be separated out
  if (!event) return <p>Loading...</p>;

    //TODO: This can be separated out into a different file for readability. Reused with senior customer service
  const handleDecision = async (stat: string, nxtAct: string) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: stat, nextAction: nxtAct }),
      });

      if (res.ok) {
        const updatedEvent = await res.json();
        setEvent(updatedEvent);
        setIsSuccessPopupOpen(true);
        await fetchEvent(String(event.id));
        setTimeout(() => {
          setIsSuccessPopupOpen(false); 
                  setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                    router.push("/viewRequests");
                  }, 2500);
        }, 2500);
      } else {
        alert("Failed to update event status.");
      }
    } catch (error) {
      console.error("Error updating event status:", error);
      alert("An error occurred while updating the event.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <EventDetails />

      {event.nextAction === "adminmanager" && (
        <div className="flex gap-4">
          <button
            onClick={() => handleDecision("rejected", "none")}
            className="px-4 py-2 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-300"
          >
            Reject
          </button>
          <button
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-300"
                       //TODO: Change customerserviceofficer to seniorcustomerservice. 
            onClick={() => handleDecision("accepted", "customerserviceofficer")}
          >
            Accept
          </button>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              {event.nextAction === "customerserviceofficer" && (
                <p>Event Request Accepted!</p>
              )}
              {event.nextAction === "none" && (
                <p className="text-red-600">Rejection Successful!</p>
              )}
            </h2>
            {event.nextAction === "customerserviceofficer" && (
              <p>
                The client will be contacted by a <b>Customer Service Officer</b> to schedule a meeting
              </p>
            )}
            {event.nextAction === "none" && (
              <p>The event has been rejected and removed from pipeline.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
