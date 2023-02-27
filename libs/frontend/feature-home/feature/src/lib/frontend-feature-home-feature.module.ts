import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { featureRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featureRoutes)],
  declarations: [HomeComponent],
})
export class FrontendFeatureHomeFeatureModule {}
