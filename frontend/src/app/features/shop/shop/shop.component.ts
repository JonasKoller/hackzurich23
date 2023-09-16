import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  @Input() points: number;
  @Input() shopItems: any;
  @Output() buyItemClicked = new EventEmitter<any>();

  sortByBuyingPower() {
    if (!this.shopItems) {
      return [];
    }
    // @ts-ignore
    return this.shopItems.sort((a, b) => {
      if ((a.price <= this.points && b.price <= this.points) || (a.price > this.points && b.price > this.points)) {
        return a.price - b.price;
      }

      if (a.price <= this.points) return -1;

      if (b.price <= this.points) return 1;

      return 0;
    });
  }

  buyItem(shopItem: any) {
    this.buyItemClicked.emit(shopItem);
  }
}
