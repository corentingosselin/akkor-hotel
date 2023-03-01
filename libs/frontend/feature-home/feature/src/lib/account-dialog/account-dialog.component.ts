import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'akkor-hotel-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDialogComponent {
  constructor(private readonly authFacade: AuthFacade) {}

  readonly loggedIn$ = this.authFacade.isLoggedIn$;
}
