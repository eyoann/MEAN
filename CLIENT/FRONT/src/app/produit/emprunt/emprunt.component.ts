import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../membres/auth.service';
import { BienService } from '../bien.service';
import { ServiceService } from '../service.service'

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.css']
})
export class EmpruntComponent implements OnInit {
  private biens: Object;
  private services: Object;
  constructor(private auth: AuthService, private bienS: BienService, private servS: ServiceService) { }

  ngOnInit() {
  	console.log("toto");
  	console.log(this.auth.membre);
  	this.bienS.getLocation(this.auth.membre).subscribe(res => this.biens = res);
  	this.servS.getLocation(this.auth.membre).subscribe(res => this.services = res);
  }

  rendreBien(bien) {
  	this.bienS.rendre(bien).subscribe(res => console.log(res));
  }

  rendreService(service) {
  	this.servS.rendre(service).subscribe(res => console.log(res));
  }

}
