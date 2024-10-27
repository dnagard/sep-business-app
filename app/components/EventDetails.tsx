"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { useParams } from "next/navigation";

export default function EventDetails() {
    const [event, setEvent] = useState<Event | null>(null);
    const { id } = useParams() as { id: string };

    useEffect(() => {
        async function fetchEvent() {
        try {
            const res = await fetch(`/api/events/${id}`);
            const data = await res.json();
            setEvent(data);
        } catch (error) {
            console.error("Error fetching event:", error);
        }
        }
        fetchEvent();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">Event Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-6">
                {/* Column 1 */}
                <div>
                <div className="mb-4">
                    <strong>Client Name:</strong> {event.clientName}
                </div>
                <div className="mb-4">
                    <strong>Event Type:</strong> {event.eventType}
                </div>
                <div className="mb-4">
                    <strong>Memo:</strong> {event.memo}
                </div>
                <div className="mb-4">
                    <strong>Number of Attendees:</strong> {event.numAttend}
                </div>
                <div className="mb-4">
                    <strong>From Date:</strong>{" "}
                    {new Date(event.fromDate).toLocaleDateString()}
                </div>
                <div className="mb-4">
                    <strong>To Date:</strong>{" "}
                    {new Date(event.toDate).toLocaleDateString()}
                </div>
                </div>

                {/* Column 2 */}
                <div>
                <div className="mb-4">
                    <strong>Status:</strong> {event.status}
                </div>
                <div className="mb-2">
                    <strong>Decorations:</strong> {event.decorations ? "Yes" : "No"}
                </div>
                <div className="mb-2">
                    <strong>Parties:</strong> {event.parties ? "Yes" : "No"}
                </div>
                <div className="mb-2">
                    <strong>Photos:</strong> {event.photos ? "Yes" : "No"}
                </div>
                <div className="mb-2">
                    <strong>Meals:</strong> {event.meals ? "Yes" : "No"}
                </div>
                <div className="mb-2">
                    <strong>Drinks:</strong> {event.drinks ? "Yes" : "No"}
                </div>
                {event.finNote && (
                    <div className="mt-4">
                    <strong>Financial Note:</strong> {event.finNote}
                    </div>
                )}
                </div>
            </div>
            </div>
        </>
    );

}