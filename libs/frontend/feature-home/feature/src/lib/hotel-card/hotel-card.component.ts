import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { Hotel, UserRole } from '@akkor-hotel/shared/api-interfaces';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';

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

  readonly loggedUser = this.authFacade.isLoggedIn$;
  constructor(private readonly authFacade: AuthFacade) {}



  onBook(): void {
    if (!this.control.value) return;
    if (this.control.value.from === this.control.value.to) return;
    if (
      this.control.value.from === this.min &&
      this.control.value.to === this.max
    )
      return;
    }
}
