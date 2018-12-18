import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResearchComponent } from './produit/research/research.component';
import { BiensComponent } from './produit/biens/biens.component';
import { ServicesComponent } from './produit/services/services.component';
import { EmpruntComponent } from './produit/emprunt/emprunt.component';
import { ListeMembresComponent } from './membres/liste-membres/liste-membres.component'
import { AuthguardService } from './membres/authguard.service';
import { ConnexionComponent } from "./membres/connexion/connexion.component";

const routes: Routes = [
	{ path: 'researchProduit', component: ResearchComponent, canActivate: [AuthguardService] },
	{ path: 'biens', component: BiensComponent, canActivate: [AuthguardService]  },
	{ path: 'services', component: ServicesComponent, canActivate: [AuthguardService]  },
	{ path: 'membres', component: ListeMembresComponent, canActivate: [AuthguardService] },
	{ path: 'emprunt', component: EmpruntComponent, canActivate: [AuthguardService] },
	{ path: 'login', component: ConnexionComponent, outlet: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
