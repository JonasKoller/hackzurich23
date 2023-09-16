import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutePlannerContainerComponent} from './container/route-planner-container.component';
import {RoutePlannerComponent} from './route-planner/route-planner.component';
import {RouterModule} from "@angular/router";

const routes = [{path: '', component: RoutePlannerContainerComponent}];

@NgModule({
  declarations: [
    RoutePlannerContainerComponent,
    RoutePlannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RoutePlannerModule {
}
