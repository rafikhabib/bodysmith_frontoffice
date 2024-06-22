import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "./product/products-list/products-list.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { PanierComponent } from "./panier/panier.component";
import { AddproductComponent } from "./addproduct/addproduct.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' }, // Redirection vers 'product' par défaut
  { path: 'product', component: ProductsListComponent },
  { path: 'panier', component: PanierComponent }, // Assurez-vous que cette route est correcte
  { path: 'add', component: AddproductComponent },
  { path: 'edit', component: EditComponent },

  { path: '**', component: NotFoundComponent } // Route par défaut pour les chemins inconnus
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
