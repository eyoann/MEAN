import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  private objects: Object[];
  private recherche: string;
  private nom: string;
  private type: string;
  private descriptif: string;
  private prixNeuf: string;

  constructor(private research : ResearchService) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.research.getBiens(this.recherche,this.nom, this.type, this.descriptif, this.prixNeuf).subscribe(res => this.objects = res);
  }
}
