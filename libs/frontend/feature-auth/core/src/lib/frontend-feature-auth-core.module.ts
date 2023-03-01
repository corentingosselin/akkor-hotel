import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { frontendFeatureAuthCoreRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(frontendFeatureAuthCoreRoutes)],
})
export class FrontendFeatureAuthCoreModule {}
