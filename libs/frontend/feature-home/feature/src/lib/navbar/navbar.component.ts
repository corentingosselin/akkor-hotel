import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';

@Component({
  selector: 'akkor-hotel-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private readonly authFacade: AuthFacade,
  ) {}


  openAccountDialog(): void {
    this.dialogService
      .open(new PolymorpheusComponent(AccountDialogComponent, this.injector))
      .subscribe();
  }

  logout(): void {
    this.authFacade.logout();
  }
}
