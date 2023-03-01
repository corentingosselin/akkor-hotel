import { BookingResponse, CreateBookingDto, CreatedBookingResponse, CreatedHotelResponse, CreateHotelDto } from '@akkor-hotel/shared/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  createHotel(hotel: CreateHotelDto) {
    return this.http.post<CreatedHotelResponse>('/api/hotel', hotel);
  }

  fetchHotels() {
    return this.http.get<CreatedHotelResponse[]>('/api/hotel');
  }

  bookRoom(bookDto: CreateBookingDto) {
    return this.http.post<CreatedBookingResponse>(`/api/booking`, bookDto);
  }

  getBookings(hotelId: number) {
    return this.http.get<BookingResponse[]>('/api/booking/hotel/' + hotelId);
  }

}