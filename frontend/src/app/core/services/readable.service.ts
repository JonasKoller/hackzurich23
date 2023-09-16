import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../types/article";

@Injectable({
  providedIn: 'root'
})
export class ReadableService {

  private readonly LOCALSTORAGE_POINTS = 'user.articles.read';

  constructor(private http: HttpClient) {
  }

  getAllReadables(): Observable<Article[]> {
    return this.http.get<Article[]>('https://hz-traffix.web.app/assets/mock/readables.json');
  }

  addArticlesRead(id: number) {
    let articlesRead = localStorage.getItem(this.LOCALSTORAGE_POINTS);
    if (articlesRead == undefined) {
      localStorage.setItem(this.LOCALSTORAGE_POINTS, JSON.stringify([id]));
    } else {
      let articlesReadParsed = JSON.parse(articlesRead);
      localStorage.setItem(this.LOCALSTORAGE_POINTS, JSON.stringify([...articlesReadParsed, id]));
    }
  }

  isArticleRead(id: number): boolean {
    let articlesRead = localStorage.getItem(this.LOCALSTORAGE_POINTS);
    if (articlesRead == undefined) {
      return false;
    }
    return (JSON.parse(articlesRead) as number[]).find(readId => readId == id) !== undefined;
  }
}
