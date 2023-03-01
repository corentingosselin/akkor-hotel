import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { BookingResponse, Hotel } from '@akkor-hotel/shared/api-interfaces';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

interface Booking {
  hotel: string;
  firstName: string;
  lastName: string;
  email: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'akkor-hotel-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBookingsComponent implements OnInit {
  readonly columns = [
    'firstName',
    'lastName',
    'email',
    'arrival',
    'departure',
  ];

  data: Booking[] = [];

  data$: BehaviorSubject<Booking[]> = new BehaviorSubject([] as Booking[]);

  readonly loading$ = this.loadingErrorService.loadingStatus$;
  constructor(
    private readonly hotelFacade: HotelFacade,
    private readonly loadingErrorService: LoadingErrorService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Hotel, Hotel>
  ) {}

  get hotel(): Hotel {
    return this.context.data;
}

  ngOnInit(): void {
    if (this.hotel) {
      this.hotelFacade
        .getBookings(this.hotel.id)
        .pipe(
          take(1),
          map((bookings) =>
            bookings.map((booking) => {
              return {
                hotel: booking.hotel?.name,
                firstName: booking.user?.firstName,
                lastName: booking.user?.lastName,
                email: booking.user?.email,
                startDate: booking.startDate,
                endDate: booking.endDate,
              } as Booking;
            })
          )
        )
        .subscribe((bookings) => {
          console.log(bookings);
          this.data = bookings;
          this.data$.next(bookings);
        });
    }
  }
}
