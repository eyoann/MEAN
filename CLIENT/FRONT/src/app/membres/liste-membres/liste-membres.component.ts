import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-liste-membres',
  templateUrl: './liste-membres.component.html',
  styleUrls: ['./liste-membres.component.css']
})
export class ListeMembresComponent implements OnInit {
  private membres: Object[];
  //private role:string;
  private isAdmin:boolean = false;

  constructor(private auth: AuthService, private membresService: MembresService) { }

  ngOnInit() {
     this.membresService.getMembres().subscribe(res => {
     	this.membres = res;
     	if(this.auth.membre[0]['role']=="admin") this.isAdmin = true;
     	//this.role = this.auth.membre[0]['role'];
     	console.log(this.membres);
     	console.log("role = "+this.auth.membre[0]['role']);
     	//console.log("role = "+this.role);
     	});
  }
}
