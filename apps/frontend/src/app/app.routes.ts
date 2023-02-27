import { Route } from '@angular/router';
import { PageNotFoundComponent } from '@akkor-hotel/shared/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@akkor-hotel/frontend/core').then((m) => m.FrontendCoreModule),
  },
  { path: '**', component: PageNotFoundComponent },
];
