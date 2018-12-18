import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../membres/auth.service';
import { BienService } from '../bien.service';
import { ServiceService } from '../service.service'
import { ScoreService } from '../../membres/score.service';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.css']
})
export class EmpruntComponent implements OnInit {
  private biens: Object;
  private services: Object;
  constructor(private auth: AuthService, private bienS: BienService, private servS: ServiceService, private score: ScoreService) { }

  ngOnInit() {
  	console.log("toto");
  	console.log(this.auth.membre);
  	this.bienS.getLocation(this.auth.membre).subscribe(res => this.biens = res);
  	this.servS.getLocation(this.auth.membre).subscribe(res => this.services = res);
  }

  rendreBien(bien) {
  	this.score.decrease(this.auth.membre).subscribe(res => console.log(res));
  	this.bienS.rendre(bien).subscribe(res => console.log(res));
  }

  rendreService(service) {
  	this.score.decrease(this.auth.membre).subscribe(res => console.log(res));
  	this.servS.rendre(service).subscribe(res => console.log(res));
  }

}
