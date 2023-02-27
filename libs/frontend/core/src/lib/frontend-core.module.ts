import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontendCoreRoutes } from './lib.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingErrorInterceptor } from '@akkor-hotel/shared/frontend';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(frontendCoreRoutes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingErrorInterceptor,
      multi: true
    }
  ]
})
export class FrontendCoreModule {}
