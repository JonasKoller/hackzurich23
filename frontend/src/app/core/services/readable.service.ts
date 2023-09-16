import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../../features/article";

@Injectable({
  providedIn: 'root'
})
export class ReadableService {

  constructor(private http: HttpClient) {
  }

  getAllReadables(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:4200/assets/mock/readables.json');
  }
}
