import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  private objects: Object[];
  private nom: string;
  private type: string;

  constructor(private research : ResearchService) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.research.getBiens(this.nom, this.type).subscribe(res => this.objects = res);
  }
}
