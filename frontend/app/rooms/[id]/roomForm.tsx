// components/RoomForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface RoomFormProps {
  roomId: string;
}

export default function RoomForm({ roomId }: RoomFormProps) {
  const [username, setUsername] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess("");
    if (!username || !checkIn || !checkOut) {
      setError("All fields are required.");
      return;
    }

    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < now || checkOutDate < now) {
      setError("Check-in and check-out date must be later than today.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after the check-in date.");
      return;
    }

    setError(null);

    const formData = {
      room_id: roomId,
      user_name: username,
      check_in_date: checkInDate.toISOString(),
      check_out_date: checkOutDate.toISOString(),
      status: "Booked",
    };
    console.log(formData);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, formData);
      setSuccess("Booking confirmed successfully!");
      setUsername("");
      setCheckIn("");
      setCheckOut("");
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      // toast({
      //   variant: "destructive",
      //   description: "Failed to confirm booking. Please try again.",
      // });
      setError(
        "Failed to confirm booking. This room is already booked for these days"
      );
    }
  };

  return (
    <div className="md:w-5/12 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Booking Information</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-medium mb-2">
            Username
          </label>
          <Input
            id="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="checkIn" className="block text-lg font-medium mb-2">
            Check-in Date
          </label>
          <Input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="checkOut" className="block text-lg font-medium mb-2">
            Check-out Date
          </label>
          <Input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Confirm Booking
        </Button>
      </form>
    </div>
  );
}
