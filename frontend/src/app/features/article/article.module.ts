import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleComponent} from './article/article.component';
import {ArticleContainerComponent} from './container/article-container.component';
import {RouterModule} from "@angular/router";

const routes = [{path: '', component: ArticleContainerComponent}];

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ArticleModule {
}
