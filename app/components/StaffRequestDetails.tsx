"use client";

import { useEffect, useState } from "react";
import { StaffRequest } from "@/types/types";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function StaffRequestDetails() {
  const [staffRequest, setStaffRequest] = useState<StaffRequest | null>(null);
  const { id } = useParams() as { id: string };

  const { user } = useUser();
  const router = useRouter();

  /* API call for data */
  useEffect(() => {
    async function fetchStaffRequest() {
      try {
        let res: Response | null = null;
        if (
          user?.username === "humanresources" ||
          user?.username === "servicemanager" ||
          user?.username === "productionmanager"
        ) {
          res = await fetch(`/api/staff/${id}`);
        } else {
          router.push("/");
          return;
        }

        if (res && !res.ok) {
          console.error("Failed to fetch staff request:", res.statusText);
          return;
        }

        const data = await res?.json();
        setStaffRequest(data);
      } catch (error) {
        console.error("Error fetching staff request:", error);
      }
    }
    fetchStaffRequest();
  }, [user?.username, router, id]);

  if (!staffRequest) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Staff Request Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Column 1 */}
          <div>
            <div className="mb-4">
              <strong>Department:</strong>
              {staffRequest.department === "servicemanager" ? " Service Team" : "Production Team"}
            </div>
            <div className="mb-4">
              <strong>Reason:</strong> {staffRequest.reason}
            </div>
            <div className="mb-4">
              <strong>Current Number of Staff:</strong> {staffRequest.currStaff}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="mb-4">
              <strong>Requested Staff:</strong> {staffRequest.requiredStaff}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {staffRequest.status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
