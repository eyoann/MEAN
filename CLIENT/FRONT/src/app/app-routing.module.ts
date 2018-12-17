import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiensComponent } from './produit/biens/biens.component';

const routes: Routes = [
	{
		path: 'researchProduit',
		component: BiensComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
