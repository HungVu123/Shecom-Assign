"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Link from "next/link";
import { Button } from "./ui/button";

const AdminCalendar: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings`
        );
        const bookings = response.data;
        const mappedEvents = bookings.map((booking: any) => ({
          id: booking.id,
          title: `${booking.user_name} - Room ${booking.room.name}`,
          start: new Date(booking.check_in_date).toISOString(),
          end: new Date(booking.check_out_date).toISOString(),
          extendedProps: {
            room: booking.room,
            status: booking.status,
          },
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white shadow-md rounded-md">
      <Link href="/admin/bookings" passHref>
        <Button variant="outline" className="mb-4">
          &larr; Back
        </Button>
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Admin Calendar Dashboard
      </h1>
      <div className="calendar-container w-full">
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
          }}
          locale="en-GB"
          initialView="dayGridMonth"
          events={events}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
