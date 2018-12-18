import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiensComponent } from './biens/biens.component';
import { FormsModule } from '@angular/forms';

import { ResearchService } from './research.service';
import { ResearchComponent } from './research/research.component';

import { BienService } from './bien.service';
import { ServiceService } from './service.service';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [BiensComponent, ResearchComponent, ServicesComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ BiensComponent, ResearchComponent, ServicesComponent],
  providers: [ ResearchService, BienService, ServiceService]
})
export class ProduitModule { }
