import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'akkor-hotel-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  
  constructor(private readonly authFacade: AuthFacade) {}


  logout(): void {  
    this.authFacade.logout();
  }

}
