import { Hotel } from "../interfaces/hotel.interface";

export interface CreatedBookingResponse {
    id: number;
    hotel: Hotel;
    startDate: Date;
    endDate: Date;
    created_at: Date;
    updated_at: Date;
}

export interface CreatedHotelResponse {
    id: number;
    name: string;
    city: string;
    address: string;
    country: string;
    description: string;
    picture: string;
    created_at: Date;
    updated_at: Date;
}