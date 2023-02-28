import { JwtInterceptor } from '@akkor-hotel/frontend/feature-auth/data-access';
import { HttpLoadingErrorInterceptor } from '@akkor-hotel/shared/frontend';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { frontendCoreRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(frontendCoreRoutes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingErrorInterceptor,
      multi: true,
    },
  ],
})
export class FrontendCoreModule {}
