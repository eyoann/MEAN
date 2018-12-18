import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../membres/auth.service';
import { BienService } from '../bien.service';

@Component({
  selector: 'app-biens',
  templateUrl: './biens.component.html',
  styleUrls: ['./biens.component.css']
})
export class BiensComponent implements OnInit {
  	private biens : Object;
	private nom: string;
  	private type: string;
  	private prix: string;
    private semaine: string;
  	private jour: string;
  	private horaire: string;
  constructor(private auth: AuthService, private bienS: BienService) { }

  ngOnInit() {
  	//this.bienS.getBiens(this.auth.membre).subscribe(res => this.biens = res);
  }

  addBien() {
  	this.bienS.add(this.nom, this.type, this.prix, this.semaine, this.jour, this.horaire, this.auth.membre).subscribe(res => console.log(res));
  }

  update() {
  	this.bienS.getBiens(this.auth.membre).subscribe(res => this.biens = res);
  }

  delete(bien) {
  	console.log("component");
  	this.bienS.delete(bien).subscribe(res => console.log(res));
  }
}