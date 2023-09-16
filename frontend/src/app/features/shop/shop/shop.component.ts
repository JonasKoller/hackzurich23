import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShopItemsService} from "../../../core/services/shop-items.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  @Input() points: number;
  @Input() shopItems: any;
  @Input() isLoading: boolean;
  @Output() buyItemClicked = new EventEmitter<any>();

  choosenItem: any;
  amount: number = 1;

  constructor(private shopItemsService: ShopItemsService) {
  }

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

  buyItem() {
    const myDialog: HTMLDialogElement | null = document.querySelector('#buy-dialog');
    myDialog!.close();
    this.buyItemClicked.emit({item: this.choosenItem, amount: this.amount});
  }

  isOneTimeBought(id: number) {
    return this.shopItemsService.isOneTimeBought(id);
  }

  showDialog(item: any) {
    this.amount = 1;
    this.choosenItem = item;
    const myDialog: HTMLDialogElement | null = document.querySelector('#buy-dialog');
    myDialog!.showModal();

    function closeDialog() {
      myDialog!.close();
    }
  }

  addAmount() {
    if ((this.amount * this.choosenItem.price) + this.choosenItem.price <= this.points) {
      this.amount += 1;
    }
  }

  subAmount() {
    if (this.amount > 1)
      this.amount -= 1;
  }
}
