import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  isLoggedIn = false;
  constructor() { }

  ngOnInit() {
  }

  login() {this.isLoggedIn = true}

  logout() {this.isLoggedIn = false}

}
