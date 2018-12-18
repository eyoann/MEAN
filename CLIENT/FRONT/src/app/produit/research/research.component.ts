import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';
import { AuthService } from '../../membres/auth.service';
import { ScoreService } from '../../membres/score.service';

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

  constructor(private auth: AuthService, private research : ResearchService, private score: ScoreService) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.research.getBiens(this.recherche,this.nom, this.type, this.descriptif, this.prixNeuf).subscribe(res => this.objects = res );
  }

  emprunter(objet)
  {
  	console.log(this.recherche);
    this.score.increase(this.auth.membre).subscribe(res => console.log(res));
  	this.research.emprunter(this.auth.membre,this.recherche,objet).subscribe(res => console.log(res));
  }
}
