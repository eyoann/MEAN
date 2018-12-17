import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiensComponent } from './biens/biens.component';
import { FormsModule } from '@angular/forms';

import { ResearchService } from './research.service';
import { ResearchComponent } from './research/research.component';

@NgModule({
  declarations: [BiensComponent, ResearchComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ BiensComponent, ResearchComponent],
  providers: [ ResearchService]
})
export class ProduitModule { }
