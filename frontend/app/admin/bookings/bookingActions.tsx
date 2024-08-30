"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface BookingActionsProps {
  bookingId: number;
}

const BookingActions: React.FC<BookingActionsProps> = ({ bookingId }) => {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push(`/admin/detail/${bookingId}`);
  };

  const handleViewCalendar = () => {
    router.push(`/admin/calendar`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleViewDetail}>
          View detail booking
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewCalendar}>
          View calendar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookingActions;
