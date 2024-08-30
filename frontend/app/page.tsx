import { Button } from "@/components/ui/button";
import RoomList from "./rooms/[id]/roomList";
import Link from "next/link";
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
      <Link href={`/admin/bookings`} passHref>
        <Button className="mt-4">Admin</Button>
      </Link>
      <RoomList />
    </div>
  );
}
