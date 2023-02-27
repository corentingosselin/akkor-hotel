import { Route } from '@angular/router';

export const frontendFeatureAuthCoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    loadChildren: () =>
      import('@akkor-hotel/frontend/feature-auth/feature').then(
        (m) => m.FrontendFeatureAuthFeatureModule
      ),
  },
];
