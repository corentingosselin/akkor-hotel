import { Component, Inject, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { HotelCreationDialogComponent } from './hotel-creation-dialog/hotel-creation-dialog.component';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'akkor-hotel-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,

) {}

  onDialogOpen(): void {
    this.dialogService.open( new PolymorpheusComponent(HotelCreationDialogComponent, this.injector)).subscribe();
  }
}
