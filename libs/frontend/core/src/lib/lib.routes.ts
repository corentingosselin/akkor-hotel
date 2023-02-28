import { AuthGuardService, LoggedGuardService } from '@akkor-hotel/frontend/feature-auth/data-access';
import { Route } from '@angular/router';

export const frontendCoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('@akkor-hotel/frontend/feature-home/core').then(
        (m) => m.FrontendFeatureHomeCoreModule
      ),
  },
  {
    path: '',
    canActivate: [LoggedGuardService],
    loadChildren: () =>
      import('@akkor-hotel/frontend/feature-auth/core').then(
        (m) => m.FrontendFeatureAuthCoreModule
      ),
  },
];
