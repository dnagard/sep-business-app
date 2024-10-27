'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { TableEvent } from "@/types/types";

export default function EventList() {
  const [events, setEvents] = useState<TableEvent[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events/lists");
        if (!res.ok) {
          console.error("Failed to fetch events:", res.statusText);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Unexpected data format:", data);
          setEvents([]); // fallback to an empty array if data isn't as expected
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const handleEventClick = (id: string) => {
    if (user?.username === "customerserviceofficer") {
      router.push(`/customerServiceOfficer/${id}`);
    } else if (user?.username === "seniorcustomerservice") {
      router.push(`/seniorcustomerservice/${id}`);
    } else if (user?.username === "financialmanager") {
      router.push(`/financialmanager/${id}`);
    } else if (user?.username === "adminmanager") {
      router.push(`/adminmanager/${id}`);
    }
  };

  // Sort events so that highlighted ones appear at the top
  const sortedEvents = [...events].sort((a, b) => {
    const aHighlighted = a.nextAction === user?.username;
    const bHighlighted = b.nextAction === user?.username;
    return aHighlighted === bHighlighted ? 0 : aHighlighted ? -1 : 1;
  });

  return (
    <div className="event-list flex flex-col items-center">
      <h1 className="text-center font-bold text-3xl mb-4">Events</h1>

      {/* Header Row for Column Labels */}
      <div className="w-4/5 p-4 rounded-t-lg bg-blue-400">
        <div className="flex justify-between text-center font-semibold text-gray-700">
          <div className="flex-1">Client Name</div>
          <div className="flex-1">Type</div>
          <div className="flex-1">From</div>
          <div className="flex-1">To</div>
          <div className="flex-1">Status</div>
        </div>
      </div>

      {/* Events List */}
      {sortedEvents.map((event, index) => (
        <div
          key={event.id}
          onClick={() => handleEventClick(String(event.id))}
          className={`m-0.5 event-item w-4/5 p-4 ${
            index === 0 ? "rounded-b-lg" : "rounded-lg" // rounded corners for the first and last items
          } cursor-pointer transition-all hover:shadow-lg hover:bg-orange-200 duration-300 ${
            index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
          }`}
          style={{
            backgroundColor:
              event.nextAction === user?.username ? "lightyellow" : undefined,
          }}
        >
          <div className="flex justify-between items-center text-center">
            <div className="flex-1 text-gray-800">{event.clientName}</div>
            <div className="flex-1 text-gray-600">{event.eventType}</div>
            <div className="flex-1 text-gray-600">
              {new Date(event.fromDate).toLocaleDateString()}
            </div>
            <div className="flex-1 text-gray-600">
              {new Date(event.toDate).toLocaleDateString()}
            </div>
            <div className="flex-1 font-semibold text-gray-700">
              {event.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}