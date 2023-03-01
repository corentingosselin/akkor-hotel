import {
  CreateBookingDto,
  CreateHotelDto,
} from '@akkor-hotel/shared/api-interfaces';
import {
  handleErrorAndLoading,
  LoadingErrorService,
} from '@akkor-hotel/shared/frontend';
import { Inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { catchError, tap, throwError } from 'rxjs';
import { HotelService } from '../services/hotel.service';

@Injectable({
  providedIn: 'root',
})
export class HotelFacade {
  constructor(
    private readonly hotelService: HotelService,
    private readonly loadingErrorService: LoadingErrorService,
    @Inject(TuiAlertService) private readonly alert: TuiAlertService
  ) {}

  createHotel(hotel: CreateHotelDto) {
    this.loadingErrorService.startLoading();
    return this.hotelService
      .createHotel(hotel)
      .pipe(handleErrorAndLoading(this.loadingErrorService));
  }

  fetchHotels() {
    this.loadingErrorService.startLoading();
    return this.hotelService
      .fetchHotels()
      .pipe(handleErrorAndLoading(this.loadingErrorService));
  }

  createBooking(bookDto: CreateBookingDto) {
    this.loadingErrorService.startLoading();
    return this.hotelService.bookRoom(bookDto).pipe(
      tap(() => this.loadingErrorService.stopLoading()),
      catchError((error) => {
        if (error.status === 400) {
          const message = error.error.message || 'Booking failed, please try again later.';
          return throwError(() => message);
        }
        return throwError(() => 'Booking failed, please try again later.');
      })
    );
  }

  getBookings(hotelId: number) {
    this.loadingErrorService.startLoading();
    return this.hotelService
      .getBookings(hotelId)
      .pipe(handleErrorAndLoading(this.loadingErrorService));
  }
}
