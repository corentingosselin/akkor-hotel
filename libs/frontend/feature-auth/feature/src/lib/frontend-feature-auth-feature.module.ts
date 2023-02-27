import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule, TuiLinkModule, TuiLoaderModule, TuiNotificationModule} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule, TuiInputModule,
  TuiInputPasswordModule
} from '@taiga-ui/kit';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RouterModule } from '@angular/router';
import { featureRoutes } from './lib.routes';

const TUI_MODULES = [
  TuiInputPasswordModule,
  TuiButtonModule,
  TuiInputModule,
  TuiFieldErrorPipeModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiNotificationModule,
  TuiLoaderModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(featureRoutes),
    TUI_MODULES,
  ],
  providers: [],
  exports: [RegisterComponent, LoginComponent],
  declarations: [RegisterComponent, LoginComponent],
})
export class FrontendFeatureAuthFeatureModule {}
