import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontendFeatureAuthCoreRoutes } from './lib.routes';
import { FrontendFeatureAuthDataAccessModule } from '@akkor-hotel/frontend/feature-auth/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontendFeatureAuthCoreRoutes),
    FrontendFeatureAuthDataAccessModule,
  ],
})
export class FrontendFeatureAuthCoreModule {}
