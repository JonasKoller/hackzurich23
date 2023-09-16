import {Component, OnInit} from '@angular/core';
import {PointsService} from "../../../core/services/points.service";
import {Observable} from "rxjs";
import {ShopItemsService} from "../../../core/services/shop-items.service";

@Component({
  selector: 'app-shop-container',
  templateUrl: './shop-container.component.html',
})
export class ShopContainerComponent implements OnInit {
  points: number = 0;
  shopItems$: Observable<any> | null = null;

  constructor(private pointsService: PointsService, private shopItemsService: ShopItemsService) {
  }

  ngOnInit(): void {
    this.points = this.pointsService.getPoints();
    this.shopItems$ = this.shopItemsService.getAllShopItems();
  }

  buyShopItem(shopItem: any) {
    this.pointsService.subPoint(shopItem.price);
    this.points = this.pointsService.getPoints();
  }
}
