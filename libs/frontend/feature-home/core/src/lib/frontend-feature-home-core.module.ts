import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontendFeatureHomeCoreRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(frontendFeatureHomeCoreRoutes)],
})
export class FrontendFeatureHomeCoreModule {}
