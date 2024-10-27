'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Example() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const [clientName, setClientName] = useState("");
  const [memo, setMemo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [numAttend, setNumAttend] = useState(0);
  const [preferences, setPreferences] = useState({
    decorations: false,
    parties: false,
    photos: false,
    meals: false,
    drinks: false,
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const eventRequest = {
      clientName,
      memo,
      eventType,
      fromDate,
      toDate,
      numAttend,
      preferences,
    };

    try {
      const res = await fetch("/api/eventRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventRequest),
      });

      if (res.ok) {
       setShowToast(true);  // Show toast on success
        setTimeout(() => {
          setShowToast(false); // Hide toast after 2 seconds
          router.push("/");    // Redirect to the home page
        }, 2000);
      } else {
        alert("Failed to submit event request. Please refresh the page and try again");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting event request:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="m-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event Overview
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Fill out this form to initiate a new Event Request.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Applicant Name / Organization Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={(e) => setClientName(e.target.value)}
                      value={clientName}
                      placeholder="Jane Smith / IBM"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="memo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event memo:
                </label>
                <div className="mt-2">
                  <textarea
                    id="memo"
                    name="memo"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setMemo(e.target.value)}
                    value={memo}
                    placeholder=" Write a short description of what this event entails. What, where, when, who, etc."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 mb-5">
              Event Details
            </h2>
            <div className="sm:col-span-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event type
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="type"
                    name="type"
                    type="text"
                    placeholder="Wedding, Gala, etc."
                    onChange={(e) => setEventType(e.target.value)}
                    value={eventType}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col my-5 ">
              <div className="flex gap-6">
                {/* From Date Selector */}
                <div className="flex flex-col ">
                  <label htmlFor="from" className="text-sm mb-2">
                    From:
                  </label>
                  <input
                    type="date"
                    id="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-center"
                  />
                </div>

                {/* To Date Selector */}
                <div className="flex flex-col">
                  <label htmlFor="to" className="text-sm mb-2">
                    To:
                  </label>
                  <input
                    type="date"
                    id="to"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="numAttendees"
                  className=" block text-sm font-medium leading-6 text-gray-900"
                >
                  Expected Number of Attendees
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="numAttendees"
                      name="numAttendees"
                      type="number"
                      placeholder=" [1...10,000]."
                      onChange={(e) => setNumAttend(Number(e.target.value))}
                      value={numAttend}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Preferences
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="decorations"
                        name="decorations"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={handleCheckboxChange}
                        checked={preferences.decorations}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="decorations"
                        className="font-medium text-gray-900"
                      >
                        Decorations
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="parties"
                        name="parties"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={preferences.parties}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="parties"
                        className="font-medium text-gray-900"
                      >
                        Parties
                      </label>
                    </div>
                  </div>

                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="photos"
                        name="photos"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={preferences.photos}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="photos"
                        className="font-medium text-gray-900"
                      >
                        Photos / Filming
                      </label>
                    </div>
                  </div>

                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="meals"
                        name="meals"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={preferences.meals}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="meals"
                        className="font-medium text-gray-900"
                      >
                        Breakfast, Lunch, Dinner
                      </label>
                    </div>
                  </div>

                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="drinks"
                        name="drinks"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={preferences.drinks}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="drinks"
                        className="font-medium text-gray-900"
                      >
                        Drinks
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm hover:bg-red-400 rounded-md bg-transparent p-1 font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading && <p>Loading...</p>}
            {!loading && <p>Save</p>}
          </button>
        </div>
      </form>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg transition-opacity duration-500">
          Event request recorded!
        </div>
      )}
    </div>
  );
}
