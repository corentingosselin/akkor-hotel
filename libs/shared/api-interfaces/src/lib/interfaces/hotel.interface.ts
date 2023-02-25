import { User } from "./user.interface";

export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  picture: string;
}

export interface Booking {
    id: number;
    hotel?: Hotel;
    user?: User;
    startDate: Date;
    endDate: Date;
}
