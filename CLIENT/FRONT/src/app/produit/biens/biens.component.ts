import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-biens',
  templateUrl: './biens.component.html',
  styleUrls: ['./biens.component.css']
})
export class BiensComponent implements OnInit {
  private biens: Object[];
  private nom: string;
  private type: string;

  constructor(private research : ResearchService) { }

  ngOnInit() {
  	//this.research.getBiens(this.type).subscribe(res => this.biens = res);
  }

  onSubmit() {
  	this.research.getBiens(this.nom, this.type).subscribe(res => this.biens = res);
  }

}