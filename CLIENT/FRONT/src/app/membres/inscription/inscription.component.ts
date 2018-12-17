import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
	isInscription = false;
	public nom: string;
  	public prenom: string;
  	public email: string;
  	public mdp: string;
  	public mobile: string;

  constructor(private membresService: MembresService) { }

  ngOnInit() {
  }

  inscrire() {
  	this.isInscription = true;
  }

  desinscrire() {this.isInscription = false}

  addMembre(nom,prenom,email,mdp,mobile){
  	console.log("component inscription addMembres");
	this.membresService.addMembres(nom,prenom,email,mdp,mobile);

  }

}
