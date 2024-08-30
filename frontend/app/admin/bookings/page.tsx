import Link from "next/link";
import { Booking, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Booking[]> {
  try {
    const response = await axios.get<Booking[]>(
      `${process.env.API_URL}/bookings`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <Link href="/" passHref>
        <Button variant="outline" className="mb-4">
          &larr; Back
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Booking Table</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
