// components/RoomFilter.tsx

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface RoomFilterProps {
  onFilter: (data: FilterData) => void;
}

interface FilterData {
  location: string;
  checkin: string;
  checkout: string;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ onFilter }) => {
  const [location, setLocation] = React.useState<string>("");
  const [checkin, setCheckin] = React.useState<string>("");
  const [checkout, setCheckout] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilter({ location, checkin, checkout });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 rounded-md border border-gray-200"
    >
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[150px]">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="mt-1"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <Label htmlFor="checkin">Check-in Date</Label>
          <Input
            id="checkin"
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            placeholder="Enter check-in date"
            className="mt-1"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <Label htmlFor="checkout">Check-out Date</Label>
          <Input
            id="checkout"
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            placeholder="Enter check-out date"
            className="mt-1"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  );
};

export default RoomFilter;
