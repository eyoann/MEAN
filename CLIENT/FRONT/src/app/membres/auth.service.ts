import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  membre : Object;

  constructor(private http: HttpClient) { }

  connexion(login, password) : Observable<any> {
     let url: string = "http://localhost:8888/connexion/login="+login+"/password="+password;
     return this.http.get(url);
  }

  LoggedIn() {return this.isLoggedIn;}
}
