import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  image_url: string;
  createdAt: string;
}

interface Booking {
  id: number;
  room_id: number;
  user_name: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  createdAt: string;
  room: Room;
}

async function fetchData(id: string): Promise<Booking | null> {
  try {
    const response = await axios.get(`${process.env.API_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchData(params.id);

  if (!data) {
    return <p>data not found</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <Link href="/admin/bookings" passHref>
        <Button variant="outline" className="mb-4">
          &larr; Back
        </Button>
      </Link>

      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">Booking Details</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-7/12 bg-gray-100 p-6 rounded-lg shadow-md">
            <Image
              src={data.room.image_url}
              alt={data.room.name}
              style={{
                width: "50%",
                height: "auto",
              }}
              width={600}
              height={400}
              className="object-cover rounded-lg mb-4"
            />
            <p>
              <strong>Name:</strong> {data.room.name}
            </p>
            <p>
              <strong>Description:</strong> {data.room.description}
            </p>
            <p>
              <strong>Price:</strong> ${data.room.price}
            </p>
            <p>
              <strong>Location:</strong> {data.room.location}
            </p>
          </div>

          <div className="md:w-5/12">
            <h2 className="text-2xl font-bold mb-2">
              Booking Detail Information
            </h2>
            <p>
              <strong>Username:</strong> {data.user_name}
            </p>
            <p>
              <strong>Check-in Date:</strong>
              {new Date(data.check_in_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out Date:</strong>
              {new Date(data.check_out_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {data.status}
            </p>
            <p>
              <strong>Created At:</strong>
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
