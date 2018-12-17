import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  private login: string;
  private password: string;
  isLoggedIn = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  	this.isLoggedIn = this.auth.LoggedIn();
  }

  checkIdentification(login, password) {
  	this.auth.connexion(login, password).subscribe(res => {this.isLoggedIn = res;});
  	return this.isLoggedIn;
  }

  onSubmit() {
  	if(this.checkIdentification(this.login, this.password)) {
  		this.auth.isLoggedIn = true;
  		this.isLoggedIn = this.auth.LoggedIn();
  	} else {
  		this.auth.isLoggedIn = false;
  		this.isLoggedIn = this.auth.LoggedIn();
  	}
  }

  logout() {
  	this.auth.isLoggedIn = false;
  	this.isLoggedIn = this.auth.LoggedIn();
  }

}
