import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';
import { FormsModule } from '@angular/forms';

import { MembresService } from './membres.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';

@NgModule({
  declarations: [ListeMembresComponent, ConnexionComponent, InscriptionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[ ListeMembresComponent, ConnexionComponent,InscriptionComponent],
  providers: [MembresService],
  bootstrap: []
})
export class MembresModule { }
