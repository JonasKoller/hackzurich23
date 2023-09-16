import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from "../../article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  @Input() article: Article;
  @Output() claimCoinsClicked = new EventEmitter<void>();

  claimCoinsClick() {
    this.claimCoinsClicked.emit();
  }
}
