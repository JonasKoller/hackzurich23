import {Component} from '@angular/core';
import {ReadableService} from "../../../core/services/readable.service";
import {ActivatedRoute} from "@angular/router";
import {Article} from "../../article";
import {PointsService} from "../../../core/services/points.service";

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
})
export class ArticleContainerComponent {
  article: Article | undefined = undefined;

  constructor(
    private readableService: ReadableService,
    private route: ActivatedRoute,
    private pointsService: PointsService) {


  }

  async ngOnInit() {
    const articles = await this.readableService.getAllReadables().toPromise();
    if (articles === undefined) return;
    const articleId = parseInt(this.route.snapshot.queryParamMap.get('id') as string);
    if (articleId == null) return;
    this.article = articles.find((a: Article) => a.id === articleId);
  }

  claimCoinsClicked() {
    if (this.article?.pointReward) {
      this.pointsService.addPoints(this.article?.pointReward);
    }
  }
}
