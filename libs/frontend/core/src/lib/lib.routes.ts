import { Route } from '@angular/router';
import { AuthGuardService } from '@akkor-hotel/frontend/feature-auth/data-access';

export const frontendCoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    loadChildren: () =>
      import('@akkor-hotel/frontend/feature-auth/core').then(
        (m) => m.FrontendFeatureAuthCoreModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('@akkor-hotel/frontend/feature-home/core').then(
        (m) => m.FrontendFeatureHomeCoreModule
      ),
  },
];
