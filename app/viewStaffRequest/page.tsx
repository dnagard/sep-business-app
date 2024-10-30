import React from "react";
import StaffRequestPage from "../components/StaffRequestList";

// Wrapper page for StaffRequestPage to make routing nicer
export default function ViewRequests() {
  return (
    <main>
      <StaffRequestPage />
    </main>
  );
}
