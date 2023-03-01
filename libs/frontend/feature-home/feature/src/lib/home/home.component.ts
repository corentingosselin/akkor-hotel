import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { UserRole } from '@akkor-hotel/shared/api-interfaces';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'akkor-hotel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  UserRole = UserRole;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly hotelFacade: HotelFacade
  ) {}

  readonly hotels$ = this.hotelFacade.fetchHotels();
  readonly loggedUser = this.authFacade.isLoggedIn$;
}
