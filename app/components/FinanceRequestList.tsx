"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { FinanceRequest } from "@/types/types";

export default function FinanceRequestPage() {
  const [financeRequest, setFinanceRequest] = useState<FinanceRequest[]>([]);
  const { user } = useUser();
  const router = useRouter();

  /*  const res = await fetch("/api/financeRequest/lists"); 
         if (!res.ok) {
          console.error("Failed to fetch finance requests:", res.statusText);
          return;
        }
*/
  useEffect(() => {
    async function fetchEvents() {
      try {
        let res: Response | null = null;
        if (
          user?.username === "financialmanager" ||
          user?.username === "servicemanager" ||
          user?.username === "productionmanager"
        ) {
          res = await fetch("/api/financeRequest/lists");
        } else {
          router.push("/");
          return;
        }

        if (res && !res.ok) {
          console.error("Failed to fetch finance request:", res.statusText);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setFinanceRequest(data);
        } else {
          console.error("Unexpected data format:", data);
          setFinanceRequest([]); // fallback to an empty array if data isn't as expected
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, [user?.username, router]);

  const handleClick = (id: string) => {
    if (user?.username === "financialmanager") {
      router.push(`/financialmanager/financeRequests/${id}`);
    } else if (user?.username === "productionmanager") {
      router.push(`/productionmanager/financeRequests/${id}`);
    } else if (user?.username === "servicemanager") {
      router.push(`/servicemanager/financeRequests/${id}`);
    }
  };

  // Sort events so that highlighted ones appear at the top
  const sortedEvents = [...financeRequest].sort((a, b) => {
    const aHighlighted = a.nextAction === user?.username;
    const bHighlighted = b.nextAction === user?.username;
    return aHighlighted === bHighlighted ? 0 : aHighlighted ? -1 : 1;
  });

  return (
    <div className="event-list flex flex-col items-center">
      <h1 className="text-center font-bold text-3xl mb-4">Finance Requests</h1>

      {/* Header Row for Column Labels */}
      <div className="w-4/5 p-4 rounded-t-lg bg-blue-400">
        <div className="flex justify-between text-center font-semibold text-gray-700">
          <div className="flex-1">Department</div>
          <div className="flex-1">Reason</div>
          <div className="flex-1">Current Budget</div>
          <div className="flex-1">Requested Budget Increase</div>
          <div className="flex-1">Status</div>
        </div>
      </div>

      {/* Events List */}
      {sortedEvents.map((financeRequest, index) => (
        <div
          key={financeRequest.id}
          onClick={() => handleClick(String(financeRequest.id))}
          className={`m-0.5 event-item w-4/5 p-4 ${
            index === 0 ? "rounded-b-lg" : "rounded-lg" // rounded corners for the first and last items
          } cursor-pointer transition-all hover:shadow-lg hover:bg-orange-200 duration-300 ${
            index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
          }`}
          style={{
            backgroundColor:
              financeRequest.nextAction === user?.username
                ? "lightyellow"
                : undefined,
          }}
        >
          <div className="flex justify-between items-center text-center">
            <div className="flex-1 text-gray-800">
              {financeRequest.department === "servicemanager"
                ? "Service"
                : "Production"}
            </div>
            <div className="flex-1 text-gray-800">{financeRequest.reason}</div>
            <div className="flex-1 text-gray-600">{financeRequest.budget}</div>
            <div className="flex-1 text-gray-600">
              {financeRequest.desiredBudget}
            </div>
            <div className="flex-1 text-gray-600">{financeRequest.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
