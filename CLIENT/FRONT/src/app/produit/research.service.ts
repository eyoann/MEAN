import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ResearchService {

  constructor(private http: HttpClient) { }

  getBiens(recherche,nom, type, descriptif,prixNeuf): Observable<any> {
     let observable: Observable<any>;
     let url = "http://localhost:8888/";
     if (recherche=="bien") {
        url+="biens"; 
     }
     else {
         url+="services"; 
     }
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

     if(!descriptif) {
         url+="/undefined";
     } else {
         url+="/"+descriptif;
     }

     if(!prixNeuf) {
         url+="/undefined";
     } else {
         url+="/"+prixNeuf;
     }

     observable =  this.http.get(url);
     return observable;
  }

  emprunter(membre,bienOuservice,objet):Observable<any>{
      console.log("membre = "+membre);
      console.log("email = "+membre[0]['email']);
      console.log("bienOuService = "+bienOuservice);
      console.log("objet id = "+objet._id);

      let url = "http://localhost:8888/emprunt/"+membre[0]['email']+"/"+bienOuservice+"/"+objet._id;
      return this.http.get(url);
  }
}
