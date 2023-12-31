import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'route-planner',
    loadChildren: () => import('./features/route-planner/route-planner.module').then((m) => m.RoutePlannerModule),
  },
  {
    path: 'learning',
    loadChildren: () => import('./features/learning/learning.module').then((m) => m.LearningModule),
  },
  {
    path: 'article',
    loadChildren: () => import('./features/article/article.module').then((m) => m.ArticleModule),
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'follow-me',
    loadChildren: () => import('./features/follow-me/follow-me.module').then((m) => m.FollowMeModule),
  },
  {
    path: '**',
    redirectTo: 'route-planner',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
