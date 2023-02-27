import { Route } from '@angular/router';

export const frontendFeatureHomeCoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    loadChildren: () =>
      import('@akkor-hotel/frontend/feature-home/feature').then(
        (m) => m.FrontendFeatureHomeFeatureModule
      ),
  }
];
