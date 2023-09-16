import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LearningComponent} from './learning/learning.component';
import {LearningContainerComponent} from './container/learning-container.component';

const routes = [{path: '', component: LearningContainerComponent}];

@NgModule({
  declarations: [
    LearningComponent,
    LearningContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LearningModule {
}
