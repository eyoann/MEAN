import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  private login: string;
  private password: string;
  isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  	this.isLoggedIn = this.auth.LoggedIn();
  }

  checkIdentification(login, password) {
  	this.auth.connexion(login, password).subscribe(res => {this.auth.membre = res;});
  	return (this.auth.membre) ? true : false;
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
    this.auth.membre = null;
  	this.isLoggedIn = this.auth.LoggedIn();
  }

}
