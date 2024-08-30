import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BookingDto {
  @IsInt()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsDateString()
  check_in_date: Date;

  @IsDateString()
  check_out_date: Date;

  @IsString()
  @IsNotEmpty()
  status: string;
}
