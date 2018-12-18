import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../membres/auth.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  private services : Object;
  private nom: string;
  private type: string;
  private prix: string;
  private semaine: string;
  private jour: string;
  private horaire: string;

  constructor(private auth: AuthService, private serv: ServiceService) { }

  ngOnInit() {
  }

  addService() {
  	this.serv.add(this.nom, this.type, this.prix, this.semaine, this.jour, this.horaire, this.auth.membre).subscribe(res => console.log(res));
  }

  update() {
  	this.serv.getServices(this.auth.membre).subscribe(res => this.services = res);
  	console.log(this.services);
  }

  delete(service) {
  	this.serv.delete(service).subscribe(res => console.log(res));
  }

}