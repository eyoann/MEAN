import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';

import { MembresService } from './membres.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ListeMembresComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports:[ ListeMembresComponent],
  providers: [MembresService],
  bootstrap: []
})
export class MembresModule { }
