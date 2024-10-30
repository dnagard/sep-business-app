"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StaffRequest } from "@/types/types";
import StaffRequestDetails from "@/app/components/StaffRequestDetails";
import { useRouter } from "next/navigation";

export default function HumanResourcesDecision() {
  const [staffRequest, setStaffRequest] = useState<StaffRequest | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const { id } = useParams() as { id: string };
  const router = useRouter();

  async function fetchEvent(id: string) {
    try {
      const res = await fetch(`/api/staff/${id}`);
      const data = await res.json();
      setStaffRequest(data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  }
  /* Fetching data from the API */
  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  //TODO: Add some more interesting loading options, and potentially a skeleton somewhere.
  if (!staffRequest) return <p>Loading...</p>;

  const handleDecision = async (stat: string, nxtAct: string) => {
    try {
      const res = await fetch(`/api/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: stat, nextAction: nxtAct }),
      });

      if (res.ok) {
        const updatedStaffRequest = await res.json();
        setStaffRequest(updatedStaffRequest);
        setIsSuccessPopupOpen(true);
        await fetchEvent(String(staffRequest.id));
        setTimeout(() => {
          setIsSuccessPopupOpen(false);
          router.push("/viewStaffRequest");
        }, 2500);
      } else {
        alert("Failed to update staff request status.");
      }
    } catch (error) {
      console.error("Error updating staff request status:", error);
      alert("An error occurred while updating the staff request.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <StaffRequestDetails />
      {staffRequest.nextAction === "humanresources" && (
        <div className="flex gap-4">
          <button
            onClick={() => handleDecision("rejected", "none")}
            className="px-4 py-2 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-300"
          >
            Reject
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-300"
            onClick={() => handleDecision("accepted", staffRequest.department)}
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
              {staffRequest.status === "accepted" && (
                <p>
                  <b>{staffRequest.department}</b> notified of acceptance!
                </p>
              )}
              {staffRequest.nextAction === "none" && (
                <p className="text-red-600">
                  <b>{staffRequest.department}</b> notified of rejection!
                </p>
              )}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
