import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) { }

  add(nom, type, prix, semaine, jour, horaire, membre) { 
  	let headers = new HttpHeaders();
    headers.set('Content-type','application/json');

    var param ={
      'nom' : nom,
      'type' : type,
      'prix' : prix,
      'semaine' : semaine,
      'jour': jour,
      'horaire' : horaire,
      'membre' : membre[0]['email']
    };

    return this.http.post("http://localhost:8888/services/add",param,{headers : headers});
  }

  getServices(membre) {
  	let url = "http://localhost:8888/services/membre="+membre[0]['email'];
    return this.http.get(url);
  }

  delete(service) {
  	console.log(service._id);
  	let url = "http://localhost:8888/services-suppression/"+service._id;
  	return this.http.get(url);
  }

  getLocation(membre) {
    let url = "http://localhost:8888/services-location/membre="+membre[0]['email'];
    return this.http.get(url);
  }

  rendre(service) {
    let url = "http://localhost:8888/services-rendre/"+service._id;
    return this.http.get(url);
  }
}