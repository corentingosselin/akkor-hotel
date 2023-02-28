import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
  TuiThemeNightModule
} from '@taiga-ui/core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FrontendCoreModule } from '@akkor-hotel/frontend/core';


@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
    TuiThemeNightModule,
    FrontendCoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
