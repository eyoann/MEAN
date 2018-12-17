import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiensComponent } from './biens/biens.component';
import { FormsModule } from '@angular/forms';

import { ResearchService } from './research.service';

@NgModule({
  declarations: [BiensComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ BiensComponent],
  providers: [ ResearchService]
})
export class ProduitModule { }
