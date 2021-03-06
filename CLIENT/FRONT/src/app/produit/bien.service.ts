import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BienService {

  constructor(private http: HttpClient) { }

  add(nom, type, prix, semaine, jour, horaire, membre) {
  	let headers = new HttpHeaders();
    headers.set('Content-type','application/json');
    console.log(membre);

    var param ={
      'nom' : nom,
      'type' : type,
      'prix' : prix,
      'semaine' : semaine,
      'jour': jour,
      'horaire' : horaire,
      'membre' : membre[0]['email']
    };

    return this.http.post("http://localhost:8888/biens/add",param,{headers : headers});
  }

  getBiens(membre) {
  	let url = "http://localhost:8888/biens/membre="+membre[0]['email'];
    return this.http.get(url);
  }

  delete(bien) {
  	console.log(bien._id);
  	let url = "http://localhost:8888/biens-suppression/"+bien._id;
  	return this.http.get(url);
  }

  getLocation(membre) {
    console.log(membre[0]['email']);
    let url = "http://localhost:8888/biens-location/membre="+membre[0]['email'];
    return this.http.get(url);
  }

  rendre(bien) {
    let url = "http://localhost:8888/biens-rendre/"+bien._id;
    return this.http.get(url);
  }
}
