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

  addMembres(nom,prenom,email,mdp,mobile): boolean{
  	//let headers = new Headers({"Content-type" : "application/json"});
  	//let option = new RequestOptions({headers : headers});
  	console.log("membres services addMembres");
  	let url: string = "http://localhost:8888/membre-inscription";
  	this.http.post(url,{"nom":nom,"prenom":prenom,"email":email,"mdp":mdp,"mobile":mobile});
  	console.log("FIN membres services addMembres");
  	return true;
  }
}

