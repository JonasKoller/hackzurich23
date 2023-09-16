import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'route-planner',
    loadChildren: () => import('./features/route-planner/route-planner.module').then((m) => m.RoutePlannerModule),
  },
  {
    path: '**',
    redirectTo: 'route-planner',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
