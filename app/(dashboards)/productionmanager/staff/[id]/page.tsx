"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StaffRequest } from "@/types/types";
import StaffRequestDetails from "@/app/components/StaffRequestDetails";
import { useRouter } from "next/navigation";

export default function Acknowledgement() {
  const [staffRequest, setStaffRequest] = useState<StaffRequest | null>(null);
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
        router.push("/viewStaffRequest");
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
      {staffRequest.nextAction === "productionmanager" && (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-300"
            onClick={() => handleDecision(staffRequest.status, "none")}
          >
            Acknowledge decision
          </button>
        </div>
      )}
    </div>
  );
}
