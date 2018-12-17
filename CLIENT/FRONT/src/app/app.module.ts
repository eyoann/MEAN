import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MembresModule } from './membres/membres.module';
import { ProduitModule } from './produit/produit.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MembresModule,
    ProduitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
