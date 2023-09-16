import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from "../../../core/types/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  @Input() article: Article;
  @Output() claimCoinsClicked = new EventEmitter<void>();
  @Input() isArticleRead: boolean;

  claimCoinsClick() {
    this.claimCoinsClicked.emit();
  }
}
