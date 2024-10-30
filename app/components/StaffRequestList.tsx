"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { StaffRequest } from "@/types/types";

export default function StaffRequestPage() {
  const [staffRequests, setStaffRequests] = useState<StaffRequest[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/staff/lists");
        if (!res.ok) {
          console.error("Failed to fetch staff requests:", res.statusText);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setStaffRequests(data);
        } else {
          console.error("Unexpected data format:", data);
          setStaffRequests([]); // fallback to an empty array if data isn't as expected
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const handleClick = (id: string) => {
    if (user?.username === "humanresources") {
      router.push(`/humanresources/${id}`);
    } else if (user?.username === "productionmanager") {
      router.push(`/productionmanager/staff/${id}`);
    } else if (user?.username === "servicemanager") {
      router.push(`/servicemanager/staff/${id}`);
    }
  };

  // Sort events so that highlighted ones appear at the top
  const sortedEvents = [...staffRequests].sort((a, b) => {
    const aHighlighted = a.nextAction === user?.username;
    const bHighlighted = b.nextAction === user?.username;
    return aHighlighted === bHighlighted ? 0 : aHighlighted ? -1 : 1;
  });

  return (
    <div className="event-list flex flex-col items-center">
      <h1 className="text-center font-bold text-3xl mb-4">Staff Requests</h1>

      {/* Header Row for Column Labels */}
      <div className="w-4/5 p-4 rounded-t-lg bg-blue-400">
        <div className="flex justify-between text-center font-semibold text-gray-700">
          <div className="flex-1">Department</div>
          <div className="flex-1">Reason</div>
          <div className="flex-1">Current Staff</div>
          <div className="flex-1">Requested Staff Increase</div>
          <div className="flex-1">Status</div>
        </div>
      </div>

      {/* Events List */}
      {sortedEvents.map((staffRequest, index) => (
        <div
          key={staffRequest.id}
          onClick={() => handleClick(String(staffRequest.id))}
          className={`m-0.5 event-item w-4/5 p-4 ${
            index === 0 ? "rounded-b-lg" : "rounded-lg" // rounded corners for the first and last items
          } cursor-pointer transition-all hover:shadow-lg hover:bg-orange-200 duration-300 ${
            index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
          }`}
          style={{
            backgroundColor:
              staffRequest.nextAction === user?.username
                ? "lightyellow"
                : undefined,
          }}
        >
          <div className="flex justify-between items-center text-center">
            <div className="flex-1 text-gray-800">
              {staffRequest.department === "productionmanager" && (
                <p>Production Team</p>
              )}
              {staffRequest.department === "servicemanager" && (
                <p>Service Team</p>
              )}
            </div>
            <div className="flex-1 text-gray-800">{staffRequest.reason}</div>
            <div className="flex-1 text-gray-600">{staffRequest.currStaff}</div>
            <div className="flex-1 text-gray-600">
              {staffRequest.requiredStaff}
            </div>
            <div className="flex-1 text-gray-600">{staffRequest.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
