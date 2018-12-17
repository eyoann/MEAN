import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MembresService } from '../membres.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
	isInscription = false;
  public membres: Object[];
  public resultat_chaine : Object;
	public nom: string;
  	public prenom: string;
  	public email: string;
    public mdp: string;
  	public sexe: string;
  	public mobile: string;

  constructor(private membresService: MembresService) { }

  ngOnInit() {
  }

  inscrire() {
  	this.isInscription = true;
  }

  desinscrire() {this.isInscription = false}

  addMembre(nom,prenom,email,mdp,sexe,mobile){

  	// console.log("component inscription addMembres");
   //  console.log("nom = "+this.nom);
   //  console.log("nom = "+this.prenom);
   //  console.log("nom = "+this.email);
   //  console.log("nom = "+this.mdp);
   //  console.log("nom = "+this.sexe);
   //  console.log("nom = "+this.mobile);
	this.membresService.addMembres(this.nom,this.prenom,this.email,this.mdp,this.sexe,this.mobile).subscribe(res => console.log(res));
  this.isInscription = false;
  //console.log(this.resultat_chaine);

  }

}
