import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';

import { MembresService } from './membres.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConnexionComponent } from './connexion/connexion.component';

@NgModule({
  declarations: [ListeMembresComponent, ConnexionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports:[ ListeMembresComponent, ConnexionComponent],
  providers: [MembresService],
  bootstrap: []
})
export class MembresModule { }
