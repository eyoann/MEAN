import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { RequestOptions } from '@angular/http';
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

  addMembres(nom,prenom,email,mdp,sexe,mobile): Observable<any>{

  	//let headers = new Headers({"Content-type" : "application/json"});
  	// let option = new RequestOptions({headers : headers});
    //let observable: Observable<any>;
    let headers = new HttpHeaders();
    headers.set('Content-type','application/json');
    //headers.set("Access-Control-Allow-Origin", "*");
    //headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  	console.log("membres services addMembres");
  	let url: string = "http://localhost:8888/membre-inscription";
    var param ={
      'nom' : nom,
      'prenom' : prenom,
      'email' : email,
      'mdp' : mdp,
      'sexe ': sexe,
      'mobile' : mobile,
      'score' :  0
    };

    return this.http.post("http://localhost:8888/membre-inscription",param,{headers : headers});
  }

  // addMembres(nom,prenom,email,mdp,sexe,mobile): Observable<any>{
  
  //   let observable: Observable<any>;
  //   console.log("http://localhost:8888/membre-inscription/"+nom+"/"+prenom);
  //   observable = this.http.get("http://localhost:8888/membre-inscription/"+nom+"/"+prenom+"/"+email+"/"+mdp+"/"+sexe+"/"+mobile);
  //   console.log("FIN membres services addMembres");
  //   console.log(observable);
  //   return observable;
  // }
}

