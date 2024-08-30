"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RoomFilter from "@/components/roomFilter";

interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  image_url: string;
  createdAt: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async (data: {
    location: string;
    checkin: string;
    checkout: string;
  }) => {
    try {
      const queryParams = new URLSearchParams({
        location: data.location,
        checkin: data.checkin,
        checkout: data.checkout,
      }).toString();

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms?${queryParams}`
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching filtered rooms:", error);
      setError("Failed to fetch filtered rooms.");
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms`
        );
        setRooms(response.data);
      } catch (err) {
        setError("Failed to fetch rooms");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <RoomFilter onFilter={handleFilter} />
      <div className="flex flex-wrap -mx-4 mt-8">
        {rooms.map((room) => (
          <div key={room.id} className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <Card className="h-full flex flex-col shadow-lg">
              <CardHeader className="flex-shrink-0">
                <Image
                  src={room.image_url}
                  alt={room.name}
                  width={640}
                  height={480}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-xl font-bold mt-4">{room.name}</h2>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div className="flex-1">
                  <p className="mb-2">{room.description}</p>
                </div>
                <p className="mt-2 text-gray-600">Price: ${room.price}</p>
                <p className="mt-2 text-gray-600">Location: {room.location}</p>
                <Link href={`/rooms/${room.id}`} passHref>
                  <Button className="mt-4">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoomList;
