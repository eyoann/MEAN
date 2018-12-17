import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ResearchService {

  constructor(private http: HttpClient) { }

  getBiens(nom, type): Observable<any> {
     let observable: Observable<any>;
     let url = "http://localhost:8888/biens";
     if(!nom) {
     	url+="/undefined";
     } else {
     	url+="/"+nom;
     }

     if(!type) {
     	url+="/undefined";
     } else {
     	url+="/"+type;
     }

     observable =  this.http.get(url);
     return observable;
  }
}
