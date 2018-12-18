import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResearchComponent } from './produit/research/research.component';
import { BiensComponent } from './produit/biens/biens.component';

const routes: Routes = [
	{ path: 'researchProduit', component: ResearchComponent },
	{ path: 'biens', component: BiensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
