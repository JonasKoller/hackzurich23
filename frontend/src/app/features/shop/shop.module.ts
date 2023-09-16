import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from './shop/shop.component';
import {ShopContainerComponent} from './container/shop-container.component';
import {RouterModule} from "@angular/router";

const routes = [{path: '', component: ShopContainerComponent}];


@NgModule({
  declarations: [
    ShopComponent,
    ShopContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ShopModule {
}
