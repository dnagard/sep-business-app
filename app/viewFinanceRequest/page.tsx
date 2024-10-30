import React from "react";
import FinanceRequestPage from "../components/FinanceRequestList";

// Wrapper page for StaffRequestPage to make routing nicer
export default function ViewRequests() {
  return (
    <main>
      <FinanceRequestPage />
    </main>
  );
}
