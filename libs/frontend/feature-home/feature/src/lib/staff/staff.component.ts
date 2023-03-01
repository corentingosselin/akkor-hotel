import { CreatedHotelResponse } from '@akkor-hotel/shared/api-interfaces';
import { Component, Inject, Injector, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Observable } from 'rxjs';
import { HotelCreationDialogComponent } from './hotel-creation-dialog/hotel-creation-dialog.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';

@UntilDestroy()
@Component({
  selector: 'akkor-hotel-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {
  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  readonly hotelsSubject = new BehaviorSubject<CreatedHotelResponse[]>([]);
  readonly _hotels$: Observable<CreatedHotelResponse[]> =
    this.hotelsSubject.asObservable();

  @Input() set hotels$(hotels$: Observable<CreatedHotelResponse[]>) {
    hotels$
      .pipe(untilDestroyed(this))
      .subscribe((hotels) => this.hotelsSubject.next(hotels));
  }


  onDialogOpen(): void {
    this.dialogService
      .open<CreatedHotelResponse>(
        new PolymorpheusComponent(HotelCreationDialogComponent, this.injector)
      )
      .subscribe({
        next: (hotel) => {
          // update hotels$ with data
          if (!hotel) return;
          this.hotelsSubject.next([...this.hotelsSubject.value, hotel]);
        },
      });
  }
}
