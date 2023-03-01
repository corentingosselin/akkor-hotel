import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiPushModule,
} from '@taiga-ui/kit';
import { HomeComponent } from './home/home.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { featureRoutes } from './lib.routes';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HotelCreationDialogComponent } from './staff/hotel-creation-dialog/hotel-creation-dialog.component';
import { StaffComponent } from './staff/staff.component';
import { UserComponent } from './user/user.component';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { ListBookingsComponent } from './staff/list-bookings/list-bookings.component';
import {TuiTableModule} from '@taiga-ui/addon-table';


const TUI_MODULES = [
  TuiButtonModule,
  TuiInputModule,
  TuiNotificationModule,
  TuiLoaderModule,
  TuiDialogModule,
  TuiInputDateRangeModule,
  TuiAvatarModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiLabelModule,
  TuiPushModule,
  TuiTableModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(featureRoutes),
    TUI_MODULES,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    StaffComponent,
    UserComponent,
    HotelCreationDialogComponent,
    HotelCardComponent,
    NavbarComponent,
    ListHotelsComponent,
    AccountDialogComponent,
    ListBookingsComponent,
  ],
})
export class FrontendFeatureHomeFeatureModule {}
