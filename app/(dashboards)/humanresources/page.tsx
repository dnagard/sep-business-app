import Link from "next/link";

export default function HumanResources() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Human Resources Dashboard
      </h1>

      <Link href="/viewStaffRequest">
        <div className="flex gap-8">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Review Staffing Requests
            </h2>
            <p className="text-gray-600 text-center">
              Review and decide on pending staffing requests.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
