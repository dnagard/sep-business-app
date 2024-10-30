"use client";

import { useEffect, useState } from "react";
import { FinanceRequest } from "@/types/types";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FinanceRequestDetails() {
  const [financeRequest, setFinanceRequest] = useState<FinanceRequest | null>(null);
  const { id } = useParams() as { id: string };

  const { user } = useUser();
  const router = useRouter();

  /* API call for data */
  useEffect(() => {
    async function fetchFinanceRequest() {
      try {
        let res: Response | null = null;
        if (
          user?.username === "financialmanager" ||
          user?.username === "servicemanager" ||
          user?.username === "productionmanager"
        ) {
          res = await fetch(`/api/financeRequest/${id}`);
        } else {
          router.push("/");
          return;
        }

        if (res && !res.ok) {
          console.error("Failed to fetch finance request:", res.statusText);
          return;
        }

        const data = await res?.json();
        setFinanceRequest(data);
      } catch (error) {
        console.error("Error fetching finance request:", error);
      }
    }
    fetchFinanceRequest();
  }, [user?.username, router, id]);

  if (!financeRequest) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Finance Request Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Column 1 */}
          <div>
            <div className="mb-4">
              <strong>Reason:</strong> {financeRequest.department}
            </div>
            <div className="mb-4">
              <strong>Reason:</strong> {financeRequest.reason}
            </div>
            <div className="mb-4">
              <strong>Current Budget:</strong> {financeRequest.budget} SEK
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="mb-4">
              <strong>Requested Budget Increase:</strong>{" "}
              {financeRequest.desiredBudget} SEK
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {financeRequest.status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
