import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutePlannerContainerComponent} from './container/route-planner-container.component';
import {RoutePlannerComponent} from './route-planner/route-planner.component';
import {RouterModule} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";

const routes = [{path: '', component: RoutePlannerContainerComponent}];

@NgModule({
  declarations: [
    RoutePlannerContainerComponent,
    RoutePlannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ]
})
export class RoutePlannerModule {
}
