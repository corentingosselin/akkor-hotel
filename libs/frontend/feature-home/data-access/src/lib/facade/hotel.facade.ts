import { CreateHotelDto } from '@akkor-hotel/shared/api-interfaces';
import { handleErrorAndLoading, LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { Injectable } from '@angular/core';
import { HotelService } from '../services/hotel.service';

@Injectable({
  providedIn: 'root',
})
export class HotelFacade {
  constructor(
    private readonly hotelService: HotelService,
    private readonly loadingErrorService: LoadingErrorService
  ) {}

  createHotel(hotel: CreateHotelDto) {
    this.loadingErrorService.showLoading();
    return this.hotelService.createHotel(hotel).pipe(
      handleErrorAndLoading(this.loadingErrorService),
    )
  }

  fetchHotels() {
    this.loadingErrorService.showLoading();
    return this.hotelService.fetchHotels().pipe(
      handleErrorAndLoading(this.loadingErrorService)
    );
  }
}
