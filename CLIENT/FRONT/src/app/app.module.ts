import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MembresModule } from './membres/membres.module';
import { ProduitModule } from './produit/produit.module';
import { AuthService } from './membres/auth.service';

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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
