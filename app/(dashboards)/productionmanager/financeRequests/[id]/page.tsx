"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FinanceRequest } from "@/types/types";
import FinanceRequestDetails from "@/app/components/FinanceRequestDetails";
import { useRouter } from "next/navigation";

export default function Acknowledgement() {
  const [financeRequests, setFinanceRequests] = useState<FinanceRequest | null>(null);
  const { id } = useParams() as { id: string };
  const router = useRouter();

  async function fetchFinanceRequests(id: string) {
    try {
      const res = await fetch(`/api/financeRequest/${id}`);
      const data = await res.json();
      setFinanceRequests(data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  }
  /* Fetching data from the API */
  useEffect(() => {
    fetchFinanceRequests(id);
  }, [id]);

  //TODO: Add some more interesting loading options, and potentially a skeleton somewhere.
  if (!financeRequests) return <p>Loading...</p>;

  const handleDecision = async (stat: string, nxtAct: string) => {
    try {
      const res = await fetch(`/api/financeRequest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: stat, nextAction: nxtAct }),
      });

      if (res.ok) {
        const updatedFinanceRequest = await res.json();
        setFinanceRequests(updatedFinanceRequest);
        router.push("/viewFinanceRequest");
      } else {
        alert("Failed to update finance request status.");
      }
    } catch (error) {
      console.error("Error updating finance request status:", error);
      alert("An error occurred while updating the finance request.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <FinanceRequestDetails />
      {financeRequests.nextAction === "productionmanager" && (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-300"
            onClick={() => handleDecision(financeRequests.status, "none")}
          >
            Acknowledge decision
          </button>
        </div>
      )}
    </div>
  );
}
