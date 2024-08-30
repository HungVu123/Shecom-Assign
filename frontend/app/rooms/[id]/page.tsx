import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RoomForm from "./roomForm";

interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  image_url: string;
  createdAt: string;
}

async function fetchRoomData(id: string): Promise<Room | null> {
  try {
    const response = await axios.get(`${process.env.API_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return null;
  }
}

export default async function RoomDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const room = await fetchRoomData(params.id);

  if (!room) {
    return <p>Room not found</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <Link href="/" passHref>
        <Button variant="outline" className="mb-4">
          &larr; Back
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-7/12">
          <div className="mb-4">
            <Image
              src={room.image_url}
              alt={room.name}
              sizes="10vw"
              style={{
                width: "50%",
                height: "auto",
              }}
              width={600}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{room.name}</h1>
          </div>
          <div className="mb-4">
            <p className="text-lg">
              <strong>Price:</strong> ${room.price}
            </p>
            <p className="text-lg">
              <strong>Location:</strong> {room.location}
            </p>
            <p className="text-lg">
              <strong>Description:</strong> {room.description}
            </p>
          </div>
        </div>

        <RoomForm roomId={params.id} />
      </div>
    </div>
  );
}
