import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(public authService : AuthService, public router: Router) { }

  canActivate(): boolean {
  	if (this.authService.isLoggedIn) {return true;}
  	//this.router.navigate([{outlets: {'login': ['login']}}]);
  	return false;
  }
}
