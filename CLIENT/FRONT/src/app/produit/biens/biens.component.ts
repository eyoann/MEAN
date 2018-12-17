import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biens',
  templateUrl: './biens.component.html',
  styleUrls: ['./biens.component.css']
})
export class BiensComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	//this.research.getBiens(this.type).subscribe(res => this.biens = res);
  }

  

}