import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowMeComponent } from './follow-me/follow-me.component';
import { FollowMeContainerComponent } from './container/follow-me-container.component';
import {RouterModule} from "@angular/router";
import {DragDropModule} from "@angular/cdk/drag-drop";

const routes = [{path: '', component: FollowMeContainerComponent}];

@NgModule({
  declarations: [
    FollowMeComponent,
    FollowMeContainerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ]
})
export class FollowMeModule { }
