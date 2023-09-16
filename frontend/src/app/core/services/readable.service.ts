import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReadableService {

  constructor(private http: HttpClient) {
  }

  getAllReadables(): Observable<any> {
    return this.http.get('http://localhost:4200/assets/mock/readables.json');
  }
}
