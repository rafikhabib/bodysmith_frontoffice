import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PanierComponent } from './panier/panier.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditComponent } from './edit/edit.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PlatListComponent } from './plat-list/plat-list.component';
import { PlatDetailComponent } from './plat-detail/plat-detail.component';
import { FavoritePlansComponent } from './favorite-plans/favorite-plans.component';
import { SessionsListComponent } from "./sessions-list/sessions-list.component";
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { ReservationFormComponent } from "./reservation/reservation-form.component";
import { ReservationsComponent } from "./reservations/reservations.component";
import { CategorieComponent } from "./categorie/categorie.component";
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LoginComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path: '', redirectTo: 'product', pathMatch: 'full'}, // Redirection vers 'product' par défaut
  {
    path: 'product',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
  },
  {path: 'panier', component: PanierComponent}, // Assurez-vous que cette route est correcte
  {path: 'add', component: AddproductComponent},
  {path: 'edit', component: EditComponent},
  {path: 'sessions', component: SessionsListComponent},
  {path: 'coaches', component: CoachesListComponent},
  {path: 'reserver', component: ReservationsComponent},
  {path: 'categories', component: CategorieComponent},
  {path: 'sign-in', component: LoginComponent},

  {path: 'restaurant-list', component: RestaurantListComponent},
  {path: 'restaurant/:id', component: RestaurantDetailComponent},
  {path: 'plat-list', component: PlatListComponent},
  {path: 'plat/:id', component: PlatDetailComponent},
  {path: 'favorites', component: FavoritePlansComponent},

  {path: '**', component: NotFoundComponent}, // Route par défaut pour les chemins inconnus
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
