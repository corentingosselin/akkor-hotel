import { Hotel } from "../interfaces/hotel.interface";

export interface CreatedBookingResponse {
    id: number;
    hotel: Hotel;
    startDate: Date;
    endDate: Date;
}