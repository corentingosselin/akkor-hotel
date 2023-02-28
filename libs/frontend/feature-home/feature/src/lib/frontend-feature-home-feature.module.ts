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
  TuiLoaderModule,
  TuiNotificationModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { TuiAvatarModule, TuiFieldErrorPipeModule, TuiInputDateRangeModule, TuiInputModule } from '@taiga-ui/kit';
import { HomeComponent } from './home/home.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { featureRoutes } from './lib.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { HotelCreationDialogComponent } from './staff/hotel-creation-dialog/hotel-creation-dialog.component';
import { StaffComponent } from './staff/staff.component';
import { UserComponent } from './user/user.component';

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
  TuiFieldErrorPipeModule
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
  ],
  providers: [],
})
export class FrontendFeatureHomeFeatureModule {}
