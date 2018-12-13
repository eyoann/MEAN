import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  getMembres(): Observable<any> {
     let observable: Observable<any>;
     observable =  this.http.get("http://localhost:8888/membres");
     console.log(observable);
     return observable;
  }
}
