import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShopItem} from "../types/shop-item";

@Injectable({
  providedIn: 'root'
})
export class ShopItemsService {
  constructor(private http: HttpClient) {
  }

  getAllShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>('http://localhost:4200/assets/mock/shop-items.json');
  }
}
