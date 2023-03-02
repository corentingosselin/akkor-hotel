import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { Hotel, SessionResponse, UserRole } from '@akkor-hotel/shared/api-interfaces';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { catchError, filter, take } from 'rxjs';
import { ListBookingsComponent } from '../staff/list-bookings/list-bookings.component';

@Component({
  selector: 'akkor-hotel-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCardComponent {
  readonly UserRole = UserRole;

  private readonly today = TuiDay.currentLocal();
  private readonly nextYear = this.today.append({ month: 12 });
  readonly min = this.today;
  readonly max = this.nextYear;

  @Input() hotel: Hotel = {
    id: 0,
    name: 'Hotel Card',
    description: 'This is a simple description',
    address: '33 Avenue des Champs-Élysées',
    city: 'Paris',
    country: 'France',
    picture: 'https://www.ahstatic.com/photos/1276_ho_00_p_1024x768.jpg',
  };

  control = new FormControl();

  readonly loggedUser$ = this.authFacade.isLoggedIn$;

  constructor(
    private readonly hotelFacade: HotelFacade,
    private readonly authFacade: AuthFacade,
    @Inject(TuiAlertService) private readonly alert: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  openDialogBooking(): void {
    if (!this.hotel) return;
    this.loggedUser$
      .pipe(
        take(1),
        filter(
          (session) =>
            !!session &&
            (session.user.role === UserRole.ADMIN ||
              session.user.role === UserRole.EMPLOYEE)
        )
      )
      .subscribe(() => {
        this.dialogService
          .open(
            new PolymorpheusComponent(ListBookingsComponent, this.injector),
            {
              data: this.hotel,
            }
          )
          .subscribe();
      });
  }

  onBook(): void {
    if (!this.control.value) return;
    if (this.control.value.from === this.control.value.to) return;
    if (
      this.control.value.from === this.min &&
      this.control.value.to === this.max
    )
      return;

    this.loggedUser$.pipe(take(1)).subscribe((session) => {
      const { from, to } = this.control.value;
      const startDate = from as TuiDay;
      const endDate = to as TuiDay;

      const { id: userId } = session?.user || {};
      if (!userId) return;
      const booking = {
        startDate: startDate.toLocalNativeDate(),
        endDate: endDate.toLocalNativeDate(),
        hotelId: this.hotel.id,
        userId,
      };

      this.hotelFacade
        .createBooking(booking)
        .pipe(
          take(1),
          catchError((err) => {
            console.error(err);
            this.alert
              .open(err, {
                label: 'Booking failed',
                status: TuiNotification.Error,
              })
              .subscribe();
            throw err;
          })
        )
        .subscribe(() => {
          this.alert
            .open('Booking successful', {
              label: 'Your booking has been created',
              status: TuiNotification.Success,
            })
            .subscribe();
        });
    });
  }
}
