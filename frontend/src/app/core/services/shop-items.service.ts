import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShopItem} from "../types/shop-item";

@Injectable({
  providedIn: 'root'
})
export class ShopItemsService {
  private readonly LOCALSTORAGE_POINTS = 'user.onetime.bought';

  constructor(private http: HttpClient) {
  }

  getAllShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>('http://localhost:4200/assets/mock/shop-items.json');
  }

  isOneTimeBought(id: number): boolean {
    let onetime = localStorage.getItem(this.LOCALSTORAGE_POINTS);
    if (onetime == undefined) {
      return false;
    }
    return (JSON.parse(onetime) as number[]).find(onetimeId => onetimeId == id) !== undefined;
  }

  setOneTimeOnlyBuyed(shopItem: any) {
    let oneTimeBought = localStorage.getItem(this.LOCALSTORAGE_POINTS);
    if (oneTimeBought == undefined) {
      localStorage.setItem(this.LOCALSTORAGE_POINTS, JSON.stringify([shopItem.id]));
    } else {
      let oneTimeBoughtParsed = JSON.parse(oneTimeBought);
      localStorage.setItem(this.LOCALSTORAGE_POINTS, JSON.stringify([...oneTimeBoughtParsed, shopItem.id]));
    }
  }
}
