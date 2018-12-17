import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';
import { FormsModule } from '@angular/forms';

import { MembresService } from './membres.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConnexionComponent } from './connexion/connexion.component';

@NgModule({
  declarations: [ListeMembresComponent, ConnexionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[ ListeMembresComponent, ConnexionComponent],
  providers: [MembresService, AuthService],
  bootstrap: []
})
export class MembresModule { }
